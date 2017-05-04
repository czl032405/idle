import Character from '../character';
import BaseProps from '../../base-props';
import Skill from '../../skill/skill';
import Equit from '../../equit/equit';
import Item from '../../item/item';
import SkillSetting from '../../../setting/skill';
import EquitSetting from '../../../setting/equit';
import ItemSetting from '../../../setting/item';
import MonsterSetting from '../../../setting/monster';
import * as fs from 'fs';
import * as path from 'path';


class Monster extends Character {
    race:string
    constructor(name: string, baseProps?: BaseProps, skills?: Skill[], equits?: Equit[], drops?: {name:string,lv:number,percent:number}[]) {
        super(name, baseProps, skills, equits);
        this.drops = drops ||[];
        this.race = Object.getPrototypeOf(this).constructor.name;
        this.battleProps.nextInterval *= 1.7;
        this.battleProps.nextInterval = Math.floor(this.battleProps.nextInterval)
    }

    static build(name: string, lv: number = 1): Monster {
        var ext = /\.ts$/.test(__filename) ? 'ts' : 'js';
        var classPath = path.resolve(__dirname, `./${name}.${ext}`)
        var exist = fs.existsSync(classPath);
        if (exist) {
            var MonsterClass = require(classPath).default;
            var monster: Monster = new MonsterClass(lv);
            return monster;
        }
        else {
            if (MonsterSetting[name]) {
                var setting = MonsterSetting[name];
                var props = new BaseProps();
                for (let i in setting.props) {
                    props[i] = eval(setting.props[i])
                }
                props.lv = lv;
                var skills = [];
                for (let i in setting.skills) {
                    var skill = Skill.build(setting.skills[i].name, setting.skills[i].lv);
                    skill && skills.push(skill);
                }
                var equits = [];
                for (let i in setting.equits) {
                    var equit = Equit.build(setting.equits[i].name, setting.equits[i].lv);
                    equit && equits.push(equit);
                }
                var drops = setting.drops;
                var monster = new Monster(name, props, skills, equits, drops)
                return monster;
            }

        }
    }


   


}
export default Monster;