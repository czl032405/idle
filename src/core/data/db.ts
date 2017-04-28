
import * as mongoose from 'mongoose';
import IdleSetting from '../setting/idle';
const args = process.argv.join(" ");
var DBURL = IdleSetting["dburl2"];

if (process.env.DBURL) {
    DBURL = process.env.DBURL;
}
mongoose.connect(DBURL);
(<any>mongoose).Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'))
db.once('open', console.error.bind(console, 'db connection success'));

export default db;