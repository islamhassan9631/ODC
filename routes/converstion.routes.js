const router = require("express").Router()
const converstion = require('../app/controller/conversation.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")


router.route('/').post(auth,authService.allowedTo('admin', 'partner',"user"),converstion.creatConver)
router.route("/:userId").get(auth,authService.allowedTo('admin', 'partner',"user"),converstion.getConverstion)
module.exports = router;