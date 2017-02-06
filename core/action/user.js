const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');
const User = {

    get(id) {
        var result = await Idle.Data.User.find({ id });
        result = JSON.parse(JSON.stringify(result));
        delete result.pw;
        return result;
    },
    create(name, pw) {
        var result = await Idle.Data.User.create(name, pw);
        result = JSON.parse(JSON.stringify(result));
        delete result.pw;
        return result;
    },
    login(name, pw) {
        var result = await Idle.Data.User.login(name, pw);
        if (result) {
            result = JSON.parse(JSON.stringify(result));
            delete result.pw;
            return result;
        }
        else {
            throw "账号或密码不正确";
        }

    },
  
}

module.exports = User;