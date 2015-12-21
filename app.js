var AsteriskManager = require('asterisk-manager');

var Q = require('q');

var ami = new AsteriskManager('5038','localhost','admin','admin', true);  
//var ami = new AsteriskManager('5038','p02.mobilon.ru','amiadmin','kug09han', true);  
// In case of any connectiviy problems we got you coverd. 
ami.keepConnected();
 


ami.on('dial', function (evt) {
	console.log('dial', evt.subevent, evt.uniqueid);
});
