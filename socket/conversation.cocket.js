const message =require("../app/controller/message.controller")

module.exports=io=>{
    io.on("connection",socket=>{
        socket.on("joinConverstion",converstionId=>{
socket.join(converstionId)
        });
        socket.on("message",msg=>{
            message.addMessage(msg).then(()=>{
                io.to(msg.converstionId).enit("newMessage",msg)
            })
        })
    })
}