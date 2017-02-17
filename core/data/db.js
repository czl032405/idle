const args = process.argv.join(" ");;
const mongoose = require('mongoose');
const http = require('http');
var DBURL = require('../setting/idle.json')["dburl2"];


if(process.env.DBURL){
    DBURL=process.env.DBURL;
}
mongoose.connect(DBURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'))
db.once('open', console.error.bind(console, 'db connection success'));
