const fs = require('fs');
const moment = require('moment');
const watch = require('node-watch')
var osObj = {
	darwin: function(startTime,dir,allFiles) {
		var watcher = watch(dir,{recursive:true});
		watcher.on('change',function(file) {
			var full = file;
			var file = file.split('/')
			file = file[file.length -1];
			if((allFiles)? true : file.startsWith(`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`)){
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
module.exports = function(dir,os,allFiles) {
	var startTime = moment();
	osObj[os](startTime,dir,allFiles);
}