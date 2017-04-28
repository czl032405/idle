import Engine from '../engine/engine';
import Data from '../data/data';
import * as md5 from 'md5';
const User = {
    async get(id: string) {
        var result = await Data.User.findById(id);
        result = JSON.parse(JSON.stringify(result));
        result && delete result.pw;
        return result;
    },
    async create(name: string, pw: string) {
        var result = await Data.User.create({ name, pw: md5(pw) });
        return result;
    },
    async login(name: string, pw: string) {
        var result = await Data.User.findOne({ name, pw: md5(pw) });
        if (result) {
            return result;
        }
        else {
            throw "账号或密码不正确";
        }

    },

}

export default User;