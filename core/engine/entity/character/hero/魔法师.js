var Hero = require("./hero.js");
var BaseProps = require("../base-props");
class 魔法师 extends Hero {
    constructor(name, baseProps, skills, equits) {
        skills = skills || [];
        //skills.push() //技能加成
        //baseProps 属性加成
        var jobname = this.__proto__.constructor.name;
        super(name, baseProps, skills, equits);
    }
 
}

module.exports = 魔法师;