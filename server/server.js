const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');


const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

/**
 * On connection a socket is created to communicate with that newly
 * connected user.
 * We must register events into this socket to react to each particular
 * user emitted events.
 */
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', (socket) => {
        console.log('User was disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on PORT ${PORT}`);
});
