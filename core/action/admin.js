const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');

const Admin = {
    User: {
        list(condition) {
            var result = await Data.User.find(condition);
            result = JSON.parse(JSON.stringify(result));
            for (let i in result) {
                delete result[i].pw;
            }
            return result
        },

        ban() {
            var result = await Idle.Data.User.ban(name);
            if (result) {
                result = JSON.parse(JSON.stringify(result));
                delete result.pw;
                return result;
            }
            else {
                throw "用户不存在";
            }
        }
    },
    Hero:{
        list(condition){
            var result = await Data.Hero.find(condition);
            return result;
        }
    }

}

module.exports = Admin;