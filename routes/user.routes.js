const router = require("express").Router()
const User = require('../app/controller/user.contoller')
const auth = require("../midel/auth")
const upload = require("../midel/upload")
const authService= require("../app/controller/auth.controller")

router.get("/users",auth,authService.allowedTo("admin"), User.users)
router.get("/users/:id",auth,User.userId)
router.delete("/users/:id",auth,User.delete)
router.patch("/users/:id",auth,User.update)
router.get("/profile",auth,User.profile) 
router.delete("/logout",auth,User.logout)
router.delete("/logoutAll",auth,User.logoutAll)
router.patch("/actv",auth,User.actv)
router.patch("/unactv",auth,User.unactv)
 router.patch("/address",auth,User.address)
 router.get("/addresses",auth,User.addresses)
 router.get("/addresses/:id",auth,User.addressesId)
 router.post("/addaddres",auth,User.addaddresse)
 router.delete("/deleteAd/:id",auth,User.deleteAddresse)
 router.post("/result",auth,authService.allowedTo("admin"),User.postResult)
 router.post("/img ",auth,upload.single('avatar'),User.profileimg)
 
 

module.exports = router