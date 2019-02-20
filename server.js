const express = require('express');
const app = express();
const path = require('path');
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.set('port', process.env.PORT || 3001);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, 'views'),
    })
});

io.on('connection',function(socket){
    socket.on('stream',function(image){
        socket.broadcast.emit('stream',image);
    });
});

http.listen(app.get('port'), function(){
    console.log( 'Server is listening on port ' + app.get('port'));
} );
