const fs = require('fs');
const moment = require('moment');
const watchTree = require("fs-watch-tree").watchTree;
var osObj = {
	darwin: function(startTime,dir,files,allFiles) {
		files.forEach(file => {
			if((allFiles)? true : file.startsWith(`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`)){
				var temp = file.split(' ');
				fs.stat(`${dir}/${file}`,function(err,stats) {
					if(err){
						//console.log(err);
					} else {
						if(startTime.isBefore(moment(stats.birthtime))) {
							try {
								fs.unlinkSync(`${dir}/${file}`)
							} catch(e) {}
						}
					}

				})
			}
		});
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
	var watch = watchTree(dir,function(event) {
		fs.readdir(dir, (err, files) => {
			osObj[os](startTime,dir,files,allFiles);
		})
	})
}