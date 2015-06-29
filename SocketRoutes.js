var SocketsController = require('./controller/SocketsController');

SocketRoutes = {
	init: function () {
		io.sockets.on('connection', function (socket) {
			console.log('new connection hit');
			socket.on('readyUp', function (options) {
				SocketsController.registerUserToGroup(socket, options.groupName, options.userAgent);
			});
			socket.on('playGroup', function (groupName) {
				SocketsController.playGroup(groupName);
			});
		});
	}
}


module.exports = SocketRoutes;