var preventSC = require('./index');
var moment = require('moment')
preventSC(null,`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`)