import Character from '../character';
import BaseProps from '../../base-props';
import Skill from '../../skill/skill';
import Equit from '../../equit/equit';
import Item from '../../item/item';
import SkillSetting from '../../../setting/skill';
import EquitSetting from '../../../setting/equit';
import ItemSetting from '../../../setting/item';
import * as fs from 'fs';
import * as path from 'path';


class Monster extends Character {
    race: string
    constructor(name: string, lv: number = 1, levelUpProps?: BaseProps, skills?: Skill[], equits?: Equit[]) {
        levelUpProps = levelUpProps || {
            str: 1,
            dex: 1,
            agi: 1,
            vit: 1,
            int: 1,
            luk: 1
        }
        var baseProps = JSON.parse(JSON.stringify(levelUpProps));
        Object.keys(baseProps).forEach(key => baseProps[key] *= lv);
        baseProps = Object.assign({ lv }, baseProps);
        super(name, baseProps, skills, equits);
        this.levelUpProps = levelUpProps;
        this.race = Object.getPrototypeOf(this).constructor.name;
    }

    static build(race: string, lv: number = 1, levelUpProps?: BaseProps, skills?: Skill[], equits?: Equit[], name?: String): Monster {
        var ext = /\.ts$/.test(__filename) ? 'ts' : 'js';
        var classPath = path.resolve(__dirname, `./${race}.${ext}`)
        var exist = fs.existsSync(classPath);
        if (exist) {
            name = name || race + Math.floor(Math.random() * 10000);
            var MonsterClass = require(classPath).default;
            var monster: Monster = new MonsterClass(name, lv, levelUpProps, skills, equits);
            return monster;
        }
        else {
            return new Monster("不存在的怪物");

        }
    }





}
export default Monster;