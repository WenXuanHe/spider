var request = require('request');
var fs = require('fs');

var i = 0;
var reg = /^https?:\/\//g;
module.exports = function(img_src, cb){
	if(reg.test(img_src)){
		i++;
		//采用request模块，向服务器发起一次请求，获取图片资源
		request.head(img_src,function(err,res,body){
		    if(err){
		        console.log(err);
		    }
		    cb();
		});
		request(img_src).pipe(fs.createWriteStream(`./public/images/${i}.png`));
	}
	
};