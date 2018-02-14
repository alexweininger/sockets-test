var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});




io.on('connection', function (socket) {
    console.log('socket id: ' + socket.id + ' connected');
    socket.username = 'default';
    socket.on('set username', function(username) {
        socket.username = username;
        console.log('socket ' + socket.username);
    });
    
  
    socket.on('join game', function (roomId) {
        console.log(socket.username + ' requested to join game: ' + roomId);

        socket.join(roomId);
        socket.in(roomId).emit(socket.username + ' joined', roomId);
   
        var clients = io.sockets.clients('room'); // all users from room `room`
       console.log('players in room: ');
       for(var i = 0; i <= clients.length; i++){
           console.log(clients[i].username);
       }
    });
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