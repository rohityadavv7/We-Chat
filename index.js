const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

const Server = http.createServer(app);
const SocketIo = require("socket.io");

const io = SocketIo(Server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})

//middlewares
app.use(cors());

const PORT = process.env.PORT || 5000;

//default route
app.get('/',(req,res) => {
    return res.json({
        success:true,
        message:"Server is up and running..."
    })
})

//Socket io ka logic
io.on("connection",(socket) => {
    socket.emit('me',socket.id),

    //on Disconnect event
    socket.on("disconnect", ()=>{
        socket.broadcast.emit("callEnded");
    })

    //on CallUser event
    socket.on("callUser",({userToCall,signalData,from,name}) => {
        console.log("in Calling")
        io.to(userToCall).emit("callUser",{signal:signalData, from, name});
    });

    //on answerCall event
    socket.on("answerCall", (data) => {
        console.log("in answering")
        io.to(data.to).emit("callAccepted",data.signal);
    });
})

Server.listen(PORT, () => {
    console.log("Server Running...")
})