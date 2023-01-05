const router = require("express").Router()
const Comment = require('../app/controller/comment.controller')
const  auth  = require("../midel/auth")
const authService = require("../app/controller/auth.controller")
router.route("/"). post( auth,authService.allowedTo('user', 'admin', 'partner') ,Comment.addcomment)
.get(auth,authService.allowedTo('user', 'admin', 'partner'),Comment.Allcomment)
.delete(auth,authService.allowedTo( 'admin', 'partner'),Comment.deleteAll)

router.route("/:id").get(auth, Comment.comment).patch( auth, Comment.edit).delete( auth, Comment.delete)
 
 
module.exports = router