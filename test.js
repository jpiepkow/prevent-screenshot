var preventSC = require('./index');
var moment = require('moment')
preventSC('/Users/**user**/Desktop',`Screen Shot ${moment().format('YYYY-MM-DD').toString()}`)