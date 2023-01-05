const cartModel = require("../../db/models/cart.models")
const prodcutModel = require("../../db/models/prodcut.models")
const userModel = require("../../db/models/user.model")
const Myhelper=require("../helper")
class Cart{

static addprodcut= async(req,res)=>{
    try{
        const  {productId} = req.body;
  const product = await prodcutModel.findById(productId);
  // 1) Get Cart for logged user
  let cart = await cartModel.findOne({ user: req.user._id });

  if (!cart) {
    // create cart fot logged user with product
    cart = await cartModel.create({
      user: req.user._id,
      cartItems: [{ product: productId,  price: product.price }],
      
    });
    ;
    console.log("cart"+ cart);
  } else {
    // product exist in cart, update product quantity
    const productIndex = cart.cartItems.findIndex(
      (item) => item.product === productId 
    );
console.log(productIndex);
    if (productIndex > -1) {
      const cartItem = cart.cartItems[productIndex];
      cartItem.quantity += 1;

      cart.cartItems[productIndex] = cartItem;
      console.log(cartItem +"jhhh");
    } else {
      // product not exist in cart,  push product to cartItems array
      cart.cartItems.push({ product: productId,  price: product.price });
      
    }
    console.log(product.price);
    console.log(cart.cartItems);
  }

  // Calculate total cart price
 cart.calcTotalCartPrice(cart)
  
  await cart.save();
        return Myhelper.reshandlar(res,200,true,{numOfCartItems:cart.cartItems.length,cart:cart},"done")
    }catch(e){ return Myhelper.reshandlar(res,500,false,e,e.message)}
}
////////////////////

static getUserCart= async(req,res)=>{
    try {
        const cart = await cartModel.findOne({  userId: req.user._id })
       
       
            if(!cart) throw new Error("not found")
        
        Myhelper.reshandlar(res, 200, true, {
            cart,
          
        }, "done")
    }
    catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message)

    }
}

static removeCartItem= async(req,res)=>{
    try {
        const cart = await cartModel.findOneAndUpdate(
            {  userId: req.user._id },
            {
                $pull: { cartItems: { _id: req.params.itemId } },
              },
              { new: true }
            )
       
       
            calcTotalCartPrice(cart);
             cart.save();
        
          return Myhelper.reshandlar(res, 200, true, {numOfCartItems: cart.cartItems.length,cart:cart}, "success")   
         } catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message) } 
}
////////////

static clearCart = async(req,res)=>{
  try {
    const clearCart = await cartModel.findOneAndDelete({ user: req.user._id })
   
     
        Myhelper.reshandlar(res, 200, true, "delete")     
        
}
    catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message)

    }
}
/////////

static updateCartItemQuantity = async(req,res)=>{
  try {
    const { quantity } = req.body;

    const cart = await cartModel.findOne({ user: req.user._id });
    if (!cart) {
      throw new Error("there is no cart for user ")
    }
  
    const itemIndex = cart.cartItems.findIndex(
      (item) => item._id.toString() === req.params.itemId
    );
    if (itemIndex > -1) {
      const cartItem = cart.cartItems[itemIndex];
      cartItem.quantity = quantity;
      cart.cartItems[itemIndex] = cartItem;
    } else {
      throw new Error("there is no item for this id ")
    }
  
    calcTotalCartPrice(cart);
  
    await cart.save();
   
     
        Myhelper.reshandlar(res, 200, true, {numOfCartItems: cart.cartItems.length,cart:cart}, "success")     
        
}
    catch(e){
        Myhelper.reshandlar(res, 500, false, e, e.message)

    }
  }

////////////


static applyCoupon = async(req,res)=>{
    try {
      const coupon = await Coupon.findOne({
        name: req.body.coupon,
        expire: { $gt: Date.now() },
      });
        if (!coupon) {
            throw new Error("there is no cart for user ")
        }
        // 2) Get logged user cart to get total cart price
  const cart = await Cart.findOne({ user: req.user._id });

  const totalPrice = cart.totalCartPrice;

  // 3) Calculate price after priceAfterDiscount
  const totalPriceAfterDiscount = (
    totalPrice -
    (totalPrice * coupon.discount) / 100
  ).toFixed(2); // 99.23

  cart.totalPriceAfterDiscount = totalPriceAfterDiscount;
  await cart.save();
  Myhelper.reshandlar(res, 200, true, {numOfCartItems: cart.cartItems.length,cart:cart}, "success")

} catch(e){
  Myhelper.reshandlar(res, 500, false, e, e.message)

}
}

}
module.exports =Cart