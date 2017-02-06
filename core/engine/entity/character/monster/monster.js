const fs = require('fs');
const path = require('path');
const Character = require("../character.js");
const Skill = require('../../skill/skill.js');
const Equit = require('../../equit/equit.js');
const MonsterSetting = require('../../../setting/monster.json');

class Monster extends Character {
    constructor(name, baseProps, skills, equits, drops) {
        super(name, baseProps, skills, equits);
        this.drops = drops || {}; 
    }

    static build(name, lv) {
        lv = lv||1;
        var classPath = path.resolve(__dirname, `./${name}.js`)
        var exist = fs.existsSync(classPath);
        if (exist) {
            var MonsterClass = require(classPath);
            var monster = new MonsterClass(lv);
            return monster;
        }
        else {
            console.info(MonsterSetting)
            if (MonsterSetting[name]) {
                //var setting = Object.assign({},MonsterSetting[name]);
                var setting = MonsterSetting[name];
                var props = {};
                for (let i in setting.props) {
                    props[i] = eval(setting.props[i])
                }
                var skills = [];
                for (let i in setting.skills) {
                    var skill = Skill.build(i,setting.skills[i]);
                    skill && skills.push(skill);
                }
                var equits = [];
                for (let i in setting.equits) {
                    var equit = Equit.build(i,setting.equits[i]);
                    equit && equits.push(equit);
                }
                var drops = setting.drops||{};
                var monster = new Monster(name, props, skills, equits, drops)
            }

        }
    }

}
module.exports = Monster;