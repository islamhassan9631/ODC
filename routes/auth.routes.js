const router = require("express").Router()
const auth = require('../app/controller/auth.controller')
const passport= require("passport")

router.post('/signup', auth.register);
router.post('/login', auth.login);
router.post('/forgotPassword', auth.forgotPassword);
router.post('/verifyResetCode', auth.verifyResetCode);
router.patch('/resetPassword', auth.resetPassword);
 router.get("/google",passport.authenticate("google",{scope:["profile"]}))
 router.get("/facebook",passport.authenticate("facebook",{scope:["profile"]}))

module.exports = router;
