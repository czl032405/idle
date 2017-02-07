const fs = require('fs');
const path = require('path');
const Entity = require('../entity.js');

class Skill extends Entity {
    constructor(name, lv) {
        super(name);
        this.lv = lv;
    }

    static build(name, lv) {
        var classPath = path.resolve(__dirname, `./positive/${name}.js`);
        var classPath2 = path.resolve(__dirname, `./passtive/${name}.js`);
        var exist = fs.existsSync(classPath);
        if (!exist) {
            exist = fs.existsSync(classPath2);
            classPath = classPath2;
        }

        if (exist) {
            var SkillClass = require(classPath);
            return new SkillClass(lv);
        }
        return null;

    }

}
module.exports = Skill;