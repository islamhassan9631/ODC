const stripe = require('stripe')(process.env.STRIPE_SECRET);
const cartModel = require("../../db/models/cart.models")
const prodcutModel = require("../../db/models/prodcut.models")
const userModel = require("../../db/models/user.model")
const orderModel = require("../../db/models/order.models")
const Myhelper=require("../helper")
class Order{
   
static createCashOrder= async(req,res)=>{
    try {
        // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartModel.findById(req.params.cartId);
  if (!cart) {throw new Error("There is no such cart with id") }
  const cartPrice = cart.totalPriceAfterDiscount
  ? cart.totalPriceAfterDiscount
  : cart.totalCartPrice;
  const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

  // 3) Create order with default paymentMethodType cash
  const order = await orderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    shippingAddress: req.body.shippingAddress,
    totalOrderPrice,
  });
  // 4) After creating order, decrement product quantity, increment product sold
  if (order) {
    const bulkOption = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
      },
    }));
    await prodcutModel.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await cartModel.findByIdAndDelete(req.params.cartId);
  }
  Myhelper.reshandlar(res, 200, true,order ,"success")   
     } catch(e){
            Myhelper.reshandlar(res, 500, false, e, e.message)}
}
///////

static allOrders= async(req,res)=>{
    try{
        const Orders=await orderModel.find({})
        return Myhelper.reshandlar(res,200,true,Orders,"done")
}catch(e){
    return Myhelper.reshandlar(res,500,false,e,e.message)
}

}
//////////

static getOrder= async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(!order){return res.status(404).send("order not found")}
        return Myhelper.reshandlar(res,200,true,order,"done")
}catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
      
}
///////////

static updateOrderToPaid=async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(!order){return res.status(404).send("order not found")}
        order.isPaid = true;
  order.paidAt = Date.now();

  const updatedOrder = await order.save();
        return Myhelper.reshandlar(res,200,true,updatedOrder,"done")
}catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}

}
///////

static updateOrderToDelivered=async(req,res)=>{
    try{
        const order=await orderModel.findById(req.params.id)
        if(!order){return res.status(404).send("order not found")}
        order.isDelivered = true;
        order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
        return Myhelper.reshandlar(res,200,true,updatedOrder,"done")
}catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}

}
/////////
//    Get checkout session from stripe and send it as response

static checkout= async(req,res)=>{
    try{
         // app settings
  const taxPrice = 0;
  const shippingPrice = 0;

  // 1) Get cart depend on cartId
  const cart = await cartModel.findById(req.params.cartId);
        if(!cart){return res.status(404).send("cart not found")}
// 2) Get order price depend on cart price 
  const cartPrice = cart.totalPriceAfterDiscount
  ? cart.totalPriceAfterDiscount
  : cart.totalCartPrice;

const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

// 3) Create stripe checkout session
const session = await stripe.checkout.sessions.create({
  line_items: [
    {
      name: req.user.name,
      amount: totalOrderPrice * 100,
      currency: 'egp',
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: `${req.protocol}://${req.get('host')}/orders`,
  cancel_url: `${req.protocol}://${req.get('host')}/cart`,
  customer_email: req.user.email,
  client_reference_id: req.params.cartId,
  metadata: req.body.shippingAddress,
});
       
        return Myhelper.reshandlar(res,200,true,session,"done")
}catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}


}
/////////
static createCardOrder = async (session) => {
    const cartId = session.client_reference_id;
    const shippingAddress = session.metadata;
    const oderPrice = session.amount_total / 100;
  
    const cart = await cartModel.findById(cartId);
    const user = await userModel.findOne({ email: session.customer_email });
  
    // 3) Create order with default paymentMethodType card
    const order = await orderModel.create({
      user: user._id,
      cartItems: cart.cartItems,
      shippingAddress,
      totalOrderPrice: oderPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentMethodType: 'card',
    });
  
    // 4) After creating order, decrement product quantity, increment product sold
    if (order) {
      const bulkOption = cart.cartItems.map((item) => ({
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { quantity: -item.quantity, sold: +item.quantity } },
        },
      }));
      await prodcutModel.bulkWrite(bulkOption, {});
  
      // 5) Clear cart depend on cartId
      await cartModel.findByIdAndDelete(cartId);
    }
  }
  //////////
  //    This webhook will run when stripe payment success paid

static webhook = async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event;
    try {
        try {
            event = stripe.webhooks.constructEvent(
              req.body,
              sig,
              process.env.STRIPE_WEBHOOK_SECRET
            )
            if (event.type === 'checkout.session.completed') {
                //  Create order
               createCardOrder(event.data.object);
              }
              return Myhelper.reshandlar(res,200,true,"done")

          } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
          }
         

    }catch(e){}
}
}
module.exports=Order