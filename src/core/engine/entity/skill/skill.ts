import Character from '../character/character';
import * as fs from 'fs';
import * as path from 'path';
import Entity from '../entity';

class Skill extends Entity {
    lv: number = 1
    prop: string = ""
    constructor(lv?:number) {
        super();
        lv && (this.lv = lv);
        this.name = Object.getPrototypeOf(this).constructor.name;
    }

    static build(name, lv): Skill {
        var ext = /\.ts$/.test(__filename) ? 'ts' : 'js';
        var classPath = path.resolve(__dirname, `./positive/${name}.${ext}`);
        var classPath2 = path.resolve(__dirname, `./passtive/${name}.${ext}`);
        var exist = fs.existsSync(classPath);
        if (!exist) {
            exist = fs.existsSync(classPath2);
            classPath = classPath2;
        }
        if (exist) {
            var SkillClass = require(classPath).default;
            return new SkillClass(lv);
        }
        return new Skill(lv);
    }

    pre(hero:Character) {
        return true;
    }

}
export default Skill;


