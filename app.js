var AsteriskManager = require('asterisk-manager');

var Q = require('q');
var config = require('./config');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//asterisk 
var ami = new AsteriskManager(config.asterisk.port, config.asterisk.host, config.asterisk.username, config.asterisk.password, true);
ami.keepConnected();

var sockets = [];

ami.on('dial', function (evt) {
	console.log('dial', evt.subevent, evt.uniqueid, evt.sequencenumber);
	sockets.map(function (socket) {
		socket.emit('data', evt);
	});
});

//node
app.use('/bower_components', express["static"](__dirname + "/bower_components"));

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function (socket){
  console.log('a user connected');
  sockets.push(socket);

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(config.port, function(){
  console.log('listening on *:', config.port);
});