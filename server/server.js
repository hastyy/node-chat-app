const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');


const PORT = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();

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
    //socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    // Message to all other users informing new user joined
    // Emits the event to everybody except this socket
    //socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    // to call the callback is to send an acknoledge
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room))
            return callback('Name and room name are required.');

        socket.join(params.room);

        users.removeUser(socket.id);    // makes sure there are no duplicate ids
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log('createMessage', newMessage);

        // socket.emit emits an event to a single user
        // io.emit emits an event to all connected users
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

        // Sends an acknoledge to the cliente saying that
        // we received the message.
        // This will trigger the callback registered on the
        // client for when it receives an ack for that message.
        // We can also send data on this acknoledgment which
        // will be made available on the client callback for
        // acknoledge.
        //callback('This is from the server');
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');

        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server is up on PORT ${PORT}`);
});
