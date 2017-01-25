const mongoose = require('mongoose');
const md5 = require('md5');
const Schema = mongoose.Schema;
const User = mongoose.model('User', new Schema({
    name: { type: String, unique: true },
    pw: { type: String, minlength: 6 },
    heros: [{ id: Number }],
    status: { type: Number, default: 1 },
    creatdDate: { type: Date, default: Date.now },
}));



module.exports = {
    async find(condition) {
        return User.find(condition || {})
    },
    async create(name, pw) {
        return await User.create({ name, pw: md5(pw) });
    },
    async login(name, pw) {
        var result = await User.findOne({ name, pw: md5(pw) });
        return result;
    },
    async ban(name) {
        var user = await User.findOne({ name });
        if (user) {
            user.status = 2;
            return await user.save();
        }
        else {
            return user;
        }

    },
}
