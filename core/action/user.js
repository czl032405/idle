const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');
const md5 = require('md5');
const User = {
    async get(id) {
        var result = await Data.User.findById(id);
        result = JSON.parse(JSON.stringify(result));
        result && delete result.pw;
        return result;
    },
    async create(name, pw) {
        var result = await Data.User.create({name,  pw: md5(pw) });
        return result;
    },
    async login(name, pw) {
        var result = await Data.User.findOne({ name, pw: md5(pw) });
        if (result) {
            return result;
        }
        else {
            throw "账号或密码不正确";
        }

    },
  
}

module.exports = User;