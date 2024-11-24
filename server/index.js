const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = [];
const idToUsername = {};
const usernameToId = {};
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("sendMessage", ({toId, senderId, message, timestamp}) => {
    console.log("sendMessage on index.js");
    io.to(usernameToId[toId]).emit('getMessage', {toId, senderId:senderId, message, timestamp});
    console.log("done emitting getMessage with ", {toId: usernameToId[toId], senderId:senderId, message, timestamp});
  })

  socket.on('usernameSet', (username) => {
    let id = socket.id;
    idToUsername[id] = username;
    usernameToId[username] = id;
    onlineUsers.push(username);
    console.log('users', onlineUsers, 'userMap' ,idToUsername);

    io.emit('users', onlineUsers);
  });

  socket.on('disconnect', () => {
    console.log("disconnected", idToUsername[socket.id])
    onlineUsers = onlineUsers.filter(x => x != idToUsername[socket.id]);
    io.emit('users', onlineUsers);
    delete idToUsername[socket.id];
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
