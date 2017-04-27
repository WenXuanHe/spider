var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var download = require('../download.js');
/* GET home page. */
var mate = {
	total:50,
	currentPage:1
};

var getAllImage = function(responce){
	if(mate.total <= mate.currentPage){
		return;
	}
	var img = `https://cangjige.net/videolist-${mate.total}-${mate.currentPage}.html`;
	console.log(img);
	request(img, function(err, res, body) {
		if (!err && res.statusCode === 200) {
			callback(responce, body);
		}
	});
	
}

var callback = function(responce, body){
	let $ = cheerio.load(body);
	var imgList = [];
	Array.from($('img')).forEach(function(item) {	
		imgList.push($(item).attr('src'));
		download($(item).attr('src'), function(){
			mate.currentPage++;
			console.log('----------'+mate.currentPage);
			getAllImage(responce);
		});
	});
}
router.get('/', function(req, responce, next) {
	getAllImage(responce);
	// res.render('index', { title: 'Express' });
});

module.exports = router;