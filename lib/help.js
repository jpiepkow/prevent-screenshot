const os = require('os');
const shell = require('shelljs')
const fs = require('fs');
const plist = require('simple-plist');
const path = require('path')
const findOS = function() {
	return new Promise((resolve,reject) => {
	return resolve(os.type())	
	})
}
const findLocation = function(os) {
		if(os === 'Darwin') {
			return getOSXLocation()
		} else if(os === 'Windows_NT') {
			return getWindowsLocation()
		} else if(os=== 'Linux') {
			return getLinuxLocation()
		} else {
			return Promise.reject('Could not find os')
		}
}
const getOSXLocation = function() {
	return new Promise((resolve,reject) => {
		try {
		fs.stat(`${os.homedir()}/Library/Preferences/com.apple.screencapture.plist`,(err,stat) => {
			if(err) {
				console.log(err)
				return resolve(['~/Desktop'])
			} else {
				var data = plist.readFileSync(`${os.homedir()}/Library/Preferences/com.apple.screencapture.plist`);
				return resolve([data.location]);
			}
		})
		} catch(e) {
			return resolve(['~/Desktop']);
		}
	})
}
const getLinuxLocation = function() {
	return new Promise((resolve,reject) => {
		return resolve([`~/Desktop`])
	})
}
const getWindowsLocation = function() {
	return new Promise((resolve,reject) => {
		return resolve([`${os.homedir()}/OneDrive/Pictures/Screenshots`,`${os.homedir()}/Pictures/Screenshots`])
	})
}
const findDefault = function() {
	return new Promise((resolve,reject) => {
	findOS()
		.then(findLocation)
		.then(pth => {
			return pth.map(p => path.normalize(p))
		})
		.then(resolve)
		.catch(reject)		
	})
}
module.exports = findDefault;