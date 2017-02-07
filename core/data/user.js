const mongoose = require('mongoose');
const md5 = require('md5');
const Schema = mongoose.Schema;
const User = mongoose.model('User', new Schema({
    name: { type: String, required: true, unique: true },
    pw: { type: String, minlength: 6 },
    heros: [{ id: Number }],
    status: { type: Number, default: 1 },
    creatdDate: { type: Date, default: Date.now },
}));


module.exports = User;
