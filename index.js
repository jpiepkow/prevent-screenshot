const fs = require('fs');
const moment = require('moment');
const watch = require('node-watch');
const globToRegExp = require('glob-to-regexp');
const help = require('./lib/help');
var osObj = {
	setUpWatch: function(startTime,dir,stringParse,ignoreList) {
			help()
				.then(paths => {
					var newParse =[];
		if(!Array.isArray(stringParse)) {
			newParse.push(stringParse);
		} else {
			newParse = stringParse
		}
		if(typeof ignoreList === 'string') {
			// a string is provided, so add it to an array
			ignoreList = [ignoreList];
		} if(!Array.isArray(ignoreList)) {
			// nothing valid is provided, so create an empty array
			ignoreList = [];
		}
		
		var watcher = watch(paths,{recursive:false,filter: function(filePath){
			// move through all ignore GLOB pattern
			for(let i = 0; i < ignoreList.length; ++i) {
				// convert a GLOB pattern into regex
				let ignore = globToRegExp(ignoreList[i]);
				if(ignore.test(filePath)) {
					// found an ignored file, don't watch it
					return false;
				}
			}
			// it's not a ignored file, let's watch it
			return true;
		}});
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

				})
		
	}
}
/**
 *
 * @param {string} dir - Directory to watch
 * @param {Array|string} stringParse - String to monitor
 * @param {Array|string} ignoreList - Ignore file/directory. I takes glob format
 */
module.exports = function(dir,stringParse,ignoreList) {
	var startTime = moment();
	osObj['setUpWatch'](startTime,dir,stringParse,ignoreList);
}
