var AsteriskManager = require('asterisk-manager');

var Q = require('q');

var ami = new AsteriskManager('5038','localhost','admin','admin', true);  
//var ami = new AsteriskManager('5038','p02.mobilon.ru','amiadmin','kug09han', true);  
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();

var sockets = [];

ami.on('dial', function (evt) {
	console.log('dial', evt.subevent, evt.uniqueid);
	sockets.map(function (socket) {
		socket.emit(evt);
	});
});


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config');

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
