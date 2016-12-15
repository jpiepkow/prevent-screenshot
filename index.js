const fs = require('fs');
const moment = require('moment');
const watchTree = require("fs-watch-tree").watchTree;
var osObj = {
	darwin: function(startTime,dir,files) {
		files.forEach(file => {
			if(file.startsWith(`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`)){
				var temp = file.split(' ');
				if(startTime.isBefore(moment(`${temp[4]}${temp[5]}`,'h.mm.ssa'))) {
					try {
						fs.unlinkSync(`${dir}/${file}`)
					} catch(e) {}
				}
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
module.exports = function(dir,os) {
	var startTime = moment();
	var watch = watchTree(dir,function(event) {
		fs.readdir(dir, (err, files) => {
			osObj[os](startTime,dir,files);
		})
	})
}