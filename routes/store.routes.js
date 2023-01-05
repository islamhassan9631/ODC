const router = require("express").Router()
const Store = require('../app/controller/store.controller')
const  auth  = require("../midel/auth")
const authService = require("../app/controller/auth.controller")
router.route("/"). post( auth,authService.allowedTo('user', 'admin', 'manager') ,Store.addstore)
module.exports = router