var express = require('express');
var router = express.Router();
var Controls = require('../controller/ControlsController');

router.get('/sync', function(req, res, next) {
  Controls.registerUserToGroup({
  	socketId: 'socketid',
  	group: req.query.groupName
  });

  res.sendStatus(200);
});

router.get('/play', function(req, res, next) {
  Controls.playGroup

  res.sendStatus(200);
});

module.exports = Controls;