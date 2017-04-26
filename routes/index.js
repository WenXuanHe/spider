var express = require('express');
var router = express.Router();
var request = require('request');
let cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, responce, next) {
	console.log(111);
	request('http://www.jikexueyuan.com/', function(err, res, body) {
			console.log(11111);
			if (!err && res.statusCode === 200) {
				// console.log(body);
				let $ = cheerio.load(body);
				var imgs = {};
				Array.from($('a')).forEach(function(item) {
					//console.log($(item).attr('href'));	
					imgs[$(item).text()] = $(item).attr('href');
				});
				responce.json(imgs);
				// responce.render('index', { title: 'Express' });
			} else {
				console.log(err);
			}
		})
		// res.render('index', { title: 'Express' });
});

module.exports = router;