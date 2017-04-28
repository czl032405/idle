import * as fs from 'fs';
import * as path from 'path';
import Entity  from '../entity';
import {IEquitType} from  '../../../setting/equit';
class Equit extends Entity {
    lv:number=1
    type:IEquitType="未知"
    constructor(lv?:number) {
        super();
        this.name=Object.getPrototypeOf(this).constructor.name;

    }

    static build(name, lv):Equit {
        var ext = /\.ts$/.test(__filename)?'ts':'js';
        var classPath = path.resolve(__dirname, `./${name}.${ext}`);
        var exist = fs.existsSync(classPath);
        if (exist) {
            var EquitClass = require(classPath).default;
            return new EquitClass(lv);
        }
        return null;
    }

    apply(character) {

    }





}
export default Equit;