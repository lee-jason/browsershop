var groupNameToSocket = {};
// only one socket can be registered to one group at a time.
var registeredSocketId = {}

var Controls = function () {}

Controls.prototype.registerUserToGroup = function (socket, groupName) {
	socket.join(groupName);
	// if(!registeredSocketId[socket.id]) {
	// 	if (groupNameToSocket[groupName]) {
	// 		groupNameToSocket[groupName].push(socket);
	// 	} else {
	// 		groupNameToSocket[groupName] = [];
	// 		groupNameToSocket[groupName].push(socket);
	// 	}
	// 	registeredSocketId[socket.id] = true;
	// } else {
	// 	//socket is already registered ignore new groupname registration
	// }
	// console.log(groupNameToSocket);

}

Controls.prototype.playGroup = function (groupName) {
	// var playerList = groupNameToSocket[groupName];
	// playerList.forEach(function (socket) {
	// 	socket.emit('play', {timesent: new Date().getTime()});
	// 	this._removeGroup(socket);
	// }.bind(this));
	var timeProcessed = new Date().getTime();
	io.to(groupName).emit('play', {timesent: timeProcessed, timeToPlay: timeProcessed + 4000});
	this._removeGroup(groupName);
}

Controls.prototype._removeGroup = function (groupName) {
	var sockets_in_room = io.nsps['/'].adapter.rooms[groupName]
	var socket_objects = []

	for (socketId in sockets_in_room) {
	    socket_objects.push(io.sockets.connected[socketId])
	}

	socket_objects.forEach(function (socket) {
		socket.leave(groupName);
	});
	// groupNameToSocket[groupName].forEach(function (socket) {
	// 	delete registeredSocketId[socket.id];
	// })
	// delete groupNameToSocket[groupName];
}

module.exports = new Controls();