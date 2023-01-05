const router = require("express").Router()
const order = require('../app/controller/order.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")


router.get(
    '/checkout-session/:cartId',
    authService.allowedTo('user'),
    order.checkout
  );
  
  router.route('/:cartId').post( auth,authService.allowedTo('user'), order.createCashOrder);
  router.get(
    '/',
    auth,
    authService.allowedTo('user', 'admin', 'partner'),
    
    order.allOrders
  );
  router.get('/:id', order.getOrder);
  
  router.patch(
    '/:id/pay',
    auth,
    authService.allowedTo('admin'),
    order.updateOrderToPaid
  );
  router.patch(
    '/:id/deliver',
    auth,
    authService.allowedTo('admin'),
    order.updateOrderToDelivered
  );

module.exports = router