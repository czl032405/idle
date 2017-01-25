const args = process.argv.join(" ");;
const mongoose = require('mongoose');
var  DBURL = require('../setting/idle.json').dburl;
if(/test/.test(args)){
    DBURL =  require('../setting/idle.json').dburl2;
}
mongoose.connect(DBURL);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error')) 
db.once('open',  console.error.bind(console, 'connection success'));