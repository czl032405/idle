import {IHero} from '../data/hero';
import {IUser} from '../data/user';
import Engine from '../engine/engine';
import Data from '../data/data';

const Admin = {
    User: {
        async get(id:string) {
            var result:IUser = await Data.User.findById(id);
            return result;
        },
        async list(condition?:object) {
            var result:IUser[] = await Data.User.find(condition || {});
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

        async ban(name:string) {
            var result:IUser = null;
            var user:IUser = await Data.User.findOne({ name });
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
        async get(id:string){
            var result:IHero = await Data.Hero.findById(id);
            return result;
        },
        async list(condition?:object) {
            var result:IHero[] = await Data.Hero.find(condition || {});
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

export default  Admin;