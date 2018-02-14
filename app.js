var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chatlog = {};

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('socket id: ' + socket.id + ' connected');
    socket.username = 'default';
    socket.on('set username', function (username) {
        socket.username = username;
        
    });
});

io.on('join game', function (roomId) {
    console.log(socket.username + ' requested to join: ' + roomId);

    socket.join(roomId);

    var clients = io.sockets.adapter.rooms[roomId].sockets;

    getRoom(roomId);
});

var playing = false;
while (playing) {
    socket.on('key press', function (key) {
        console.log('key: ' + key);
        io.emit('key press', key)
    });
}


http.listen(3000, function () {
    console.log('listening on *:3000');
});

function getRoom(roomId) {
    var clients = io.sockets.adapter.rooms[roomId].sockets;

    //to get the number of clients
    var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

    console.log('(' + numClients + ') sockets in room(' + roomId + '): ');
    for (var clientId in clients) {

        //this is the socket of each client in the room.
        var clientSocket = io.sockets.connected[clientId];
        console.log('username: ' + clientSocket.username + ' id: ' + clientSocket.id);

        //you can do whatever you need with this
        clientSocket.emit('new event', "Updates");
    }
}

function newChatlog(text){
    console.log(text);
    chatlog.push(text);
    io.emit('chat log', chatlog);
}