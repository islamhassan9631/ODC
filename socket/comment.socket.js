const comment =require("../app/controller/comment.controller")

module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("comment",commentId=>{
socket.join(commentId)
        });
        socket.on("comment",newComment=>{
            comment.addcomment(newComment).then(()=>{
                io.to(newComment).enit("newcomment",newComment)
            })
        })
    })
}