const router = require("express").Router()
const Cart = require('../app/controller/cart.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")


router
  .route('/')
  .post(auth, authService.allowedTo('user'),Cart.addprodcut)
  .get(auth, authService.allowedTo('user'),Cart.getUserCart)
  .delete(auth, authService.allowedTo('user'),Cart.clearCart);

  router.patch('/applyCoupon', Cart.applyCoupon)

router
  .route('/:itemId')
  .patch(auth, authService.allowedTo('user'),Cart.updateCartItemQuantity)
  .delete(auth, authService.allowedTo('user'),Cart.removeCartItem);
module.exports = router