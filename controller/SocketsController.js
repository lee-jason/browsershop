var UAParser = require('ua-parser-js');
var IndexController = require('./IndexController');
var parser = new UAParser();
// var groupNameToSocket = {};
// // only one socket can be registered to one group at a time.
// var registeredSocketId = {}
var groupNameToMemberList = {}
var COUNTDOWN_TO_PLAY = 6000;

var Controls = function () {}

Controls.prototype.registerUserToGroup = function (socket, groupName, userAgent) {
	var sockets_in_room = io.nsps['/'].adapter.rooms[groupName] || {};
	
	if (!sockets_in_room[socket.id]) {
		console.log('socket didnt exist');
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
		console.log(userAgent);
		var browserName = IndexController.detectBrowser(userAgent);
		var singer = IndexController.determineSinger(browserName);
		var memberInfo = {browserName: browserName, singer: singer};
		this._addToGroupNameToMemberList(groupName, memberInfo);
		io.to(groupName).emit('memberAdded', groupNameToMemberList[groupName]);
	} else {
		// do nothing
	}
}

Controls.prototype._addToGroupNameToMemberList = function (groupName, memberInfo) {
	if (!groupNameToMemberList[groupName]) {
		groupNameToMemberList[groupName] = [];
	}
	groupNameToMemberList[groupName].push(memberInfo);
	console.log(groupNameToMemberList[groupName]);
}

Controls.prototype.playGroup = function (groupName) {
	// var playerList = groupNameToSocket[groupName];
	// playerList.forEach(function (socket) {
	// 	socket.emit('play', {timesent: new Date().getTime()});
	// 	this._removeGroup(socket);
	// }.bind(this));
	var timeProcessed = new Date().getTime();
	io.to(groupName).emit('play', {timesent: timeProcessed, timeToPlay: timeProcessed + COUNTDOWN_TO_PLAY});
	this._removeGroup(groupName);
	delete groupNameToMemberList[groupName];
}

Controls.prototype._removeGroup = function (groupName) {
	var sockets_in_room = io.nsps['/'].adapter.rooms[groupName];
	var socket_objects = [];

	for (socketId in sockets_in_room) {
	    socket_objects.push(io.sockets.connected[socketId]);
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