const router = require("express").Router()
const coupon = require('../app/controller/coupon.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")


router.route('/').get(auth,authService.allowedTo('admin'),coupon.allCoupon)
.post(auth,authService.allowedTo('admin'),coupon.CreateCoupon);
router.route('/:id').get(auth,authService.allowedTo('admin'),coupon.couponId)
.patch(auth,authService.allowedTo('admin'),coupon.update)
.delete(auth,authService.allowedTo('admin'),coupon.delete);

module.exports = router;
