var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('socket id: ' + socket.id + ' connected');
    
    socket.on('set username', function(username) {
        socket.username = username;
        console.log('socket ' + socket.username);
    });


    socket.on('join game', function (id) {
        console.log('user requested to join game: ' + id);

       


       

        socket.join(id);
        socket.in(id).emit('user joined', id);
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