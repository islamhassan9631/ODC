require("dotenv").config()

const app = require('./app/app')
const server = require('http').createServer(app);
const socketID = require('socket.io');
const io=socketID(server)
io.onlineUsers={}
require("./socket/init.socket")(io)
require("./socket/conversation.cocket")(io)
require("./socket/comment.socket")(io)
server.listen(process.env.PORT, ()=> console.log(`http://localhost:${process.env.PORT}`))
