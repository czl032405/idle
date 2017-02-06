const args = process.argv.join(" ");;
const mongoose = require('mongoose');
const DBURL = require('../setting/idle.json')[/test/.test(args) ? "dburl2" : "dburl"];
mongoose.connect(DBURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', console.error.bind(console, 'connection success'));