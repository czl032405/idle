const fs = require('fs');
const path = require('path');
const Entity = require('../entity.js');

class Skill extends Entity {
    constructor(lv) {
        super();
        this.name = this.__proto__.constructor.name;
        this.lv = lv || 1;
        this.prop = "";

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
        return new Skill(lv);
    }

    pre() {
        return true;
    }

}
module.exports = Skill;


