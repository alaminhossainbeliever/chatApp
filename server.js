const express = require("express")
const app =express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
  });
server.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})