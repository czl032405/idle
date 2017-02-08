const Engine = require('../engine/engine.js');
const Data = require('../data/data.js');

const Admin = {
    User: {
        async get(id) {
            var result = await Data.User.findById(id);
            return result;
        },
        async list(condition) {
            var result = await Data.User.find(condition || {});
            result = JSON.parse(JSON.stringify(result));
            for (let i in result) {
                for (let j in result[i]) {
                    if (/pw/.test(j)) {
                        delete result[i][j]
                    }
                }
            }
            return result
        },

        async ban() {
            var result = null;
            var user = await User.findOne({ name });
            if (user) {
                user.status = 2;
                result = await user.save();
            }
            else {
                result = user;
            }
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
    Hero: {
        async get(id){
            var result = await Data.Hero.findById(id);
            return result;
        },
        async list(condition) {
            var result = await Data.Hero.find(condition || {});
            result = JSON.parse(JSON.stringify(result));
            for (let i in result) {
                for (let j in result[i]) {
                    if (!/name|id|prop/i.test(j)) {
                        delete result[i][j]
                    }
                }
            }
            return result;
        }
    }

}

module.exports = Admin;