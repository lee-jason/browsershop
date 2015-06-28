var express = require('express');
var router = express.Router();
var IndexController = require('../controller/IndexController');

/* GET home page. */
router.get('/', function(req, res, next) {
	var groupName = IndexController.generateRandomSeed();
	var browser = IndexController.detectBrowser(req.headers['user-agent'])
	var singer = IndexController.determineSinger(browser)
	var musicUrl =  IndexController.musicURL[singer];
	var responseBody = {
		groupName: groupName,
		browser: browser,
		singer: singer,
		musicURL: musicUrl
	};

  res.render('index', responseBody);
});

module.exports = router;
