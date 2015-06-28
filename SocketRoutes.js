var SocketsController = require('./controller/SocketsController');

SocketRoutes = {
	init: function () {
		io.sockets.on('connection', function (socket) {
			console.log('new connection hit');
			socket.on('readyUp', function (groupName) {
				console.log('readyup hit', groupName);
				SocketsController.registerUserToGroup(socket, groupName);
			});
			socket.on('playGroup', function (groupName) {
				console.log('playGroup hit', groupName);
				SocketsController.playGroup(groupName);
			});
		});
	}
}


module.exports = SocketRoutes;