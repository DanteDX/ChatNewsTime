const express = require('express');
const app = express();
const socket = require('socket.io');
const server = app.listen(3000,()=>{console.log('Listening to port 3000')});
const io = socket(server);
const cors = require('cors');
app.use(cors());
app.use(express.static('public'));

app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('index.ejs');
})

io.on('connection',socket =>{
    console.log(`Connected with ${socket.id}`);
    socket.on('chat',data => io.sockets.emit('chat',data));
})

