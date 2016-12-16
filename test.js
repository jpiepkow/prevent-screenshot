var preventSC = require('./index');
var moment = require('moment')
preventSC('/Users/jordan/Desktop','darwin',[`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`,'tester'])