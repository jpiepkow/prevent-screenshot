const fs = require('fs');
const moment = require('moment');
const watch = require('node-watch')
var osObj = {
	darwin: function(startTime,dir,stringParse) {
		var newParse =[]
		if(!Array.isArray(stringParse)) {
			newParse.push(stringParse);
		} else {
			newParse = stringParse
		}
		var watcher = watch(dir,{recursive:true});
		watcher.on('change',function(file) {
			var full = file;
			var file = file.split('/')
			file = file[file.length -1];
			newParse.forEach(stringParse => {
				if((stringParse === true) ? true : file.includes(stringParse)){
					fs.stat(`${full}`,function(err,stats) {
						if(err){
						//console.log(err);
					} else {
						if(startTime.isBefore(moment(stats.birthtime))) {
							try {
								fs.unlinkSync(`${full}`)
							} catch(e) {}
						}
					}

				})
				}
			})	
			
		})
	},
	windows: function(startTime,dir,files) {
		// files.forEach(file => {
		// 	if(''){
		// 		var temp = file.split(' ');
		// 		if(startTime.isBefore('') {
		// 			try {
		// 				fs.unlinkSync(`${dir}/${file}`)
		// 			} catch(e) {}
		// 		}
		// 	}
		// });
	}
}
module.exports = function(dir,os,stringParse) {
	var startTime = moment();
	osObj[os](startTime,dir,stringParse);
}