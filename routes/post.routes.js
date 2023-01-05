const router = require("express").Router()
const Post = require('../app/controller/post.controller')
const upload = require("../midel/upload")
const  auth  = require("../midel/auth")
const authService = require("../app/controller/auth.controller")
router.route("/"). post(auth,authService.allowedTo('user', 'admin', 'partner'), Post.addPost,upload.array('photos', 5),Post.postimg)
.get(auth,authService.allowedTo('user', 'admin', 'partner'),Post.Allpost)
.delete(auth,authService.allowedTo( 'admin'),Post.deleteAll)
router.route("/myPosts").get( auth, Post.myPosts)
router.route("/:id").get(auth, Post.post).patch( auth, Post.edit).delete( auth, Post.delete)
 
 
module.exports = router