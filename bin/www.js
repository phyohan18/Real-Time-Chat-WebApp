const app = require("../app");
const PORT = 8080;
//server
const server = app.listen(PORT, function() {
    console.log("server on 8080");
});

//socket io
const socketio = require('socket.io')(server);
const formatMessage = require("../src/public/js/messageFormat");
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require("../src/public/js/users");

const system_name = 'Admin';
socketio.on('connection', socket => {

    socket.on('joinRoom', ({ username, room }) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('messageSystem', formatMessage(system_name, `${user.username} has joined the chat`));

        // Listen for chatMessage
        socket.on('outgoingMessage', msg => {
            const user = getCurrentUser(socket.id);
            socketio.to(user.room).emit('messageIncoming', formatMessage(user.username, msg));
        });
        //Send users and room info
        socketio.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });

        // Runs when client disconnects

        socket.on('disconnect', () => {
            const user = userLeave(socket.id);
            if (user) {
                socketio.to(user.room).emit('messageSystem', formatMessage(system_name, `${user.username} has left the chat`));

            }
            //Send users and room info
            socketio.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        });

    });


})