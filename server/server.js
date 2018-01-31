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

    // Welcome message to newly connected user
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    // Message to all other users informing new user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage', newMessage);

        // socket.emit emits an event to a single user
        // io.emit emits an event to all connected users
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });

        // Emits the event to everybody except this socket
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });

        socket.on('disconnect', (socket) => {
            console.log('User was disconnected');
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on PORT ${PORT}`);
});
