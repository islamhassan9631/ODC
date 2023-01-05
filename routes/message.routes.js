const router = require("express").Router()
const message = require('../app/controller/message.controller')
const authService = require("../app/controller/auth.controller")
const auth = require("../midel/auth")
router.route('/').post(auth,authService.allowedTo('admin', 'partner',"user"),message.addMessage)
 router.route("/:conversationId").get(auth,authService.allowedTo('admin', 'partner',"user"),message.getmessage)
module.exports = router;