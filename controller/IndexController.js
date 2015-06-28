var UAParser = require('ua-parser-js');

var parser = new UAParser();

var IndexController = {
	generateRandomSeed: function () {
		var seed  = '';
		for (var i = 0; i < 5; i++) {
			intOrStr = Math.floor(Math.random() * 2);
			if (intOrStr === 0) {
				seed += Math.floor(Math.random() * 10);
			} else {
				seed += String.fromCharCode(65 + Math.floor(Math.random() * 26));
			}
		}
		return seed;
	},
	detectBrowser: function (UAString) {
		var UAResult = parser.setUA(UAString).getResult();
		return UAResult.browser.name;
	},
	determineSinger: function (browser) {
		console.log(browser);
		var singerResult = '';
		var singers = ['lead', 'bass', 'baritone', 'tenor'];
		switch (browser) {
			case 'Chrome':
			case 'Chromium':
			case 'Android Browser':
				singerResult = singers[0];
				break;
			case '[Mobile] Safari':
			case 'Safari':
				singerResult = singers[1];
				break;
			case 'Firefox':
			case 'Mozilla':
				singerResult = singers[2];
				break;
			case 'IE':
				singerResult = singers[3];
				break;
			default:
				singerResult = singers[Math.floor(Math.random() * 4)];
		}
		return singerResult;
	},
	musicURL: {
		'lead': 'https://s3.amazonaws.com/browsershop/It_Only_Takes_A_Moment-Lead1-Mono.mp3',
		'bass': 'https://s3.amazonaws.com/browsershop/It_Only_Takes_A_Moment-Bass1-Mono.mp3',
		'baritone': 'https://s3.amazonaws.com/browsershop/It_Only_Takes_A_Moment-Bari1-Mono.mp3',
		'tenor': 'https://s3.amazonaws.com/browsershop/It_Only_Takes_A_Moment-Tenor1-Mono.mp3'
	}
}

module.exports = IndexController;