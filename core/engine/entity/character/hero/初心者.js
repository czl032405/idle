var Hero = require("./hero.js");
var BaseProps = require("../base-props");
class 初心者 extends Hero {
    constructor(name, baseProps, skills, equits) {
        skills = skills || [];
        //skills.push() //技能加成
        //baseProps 属性加成
        super(name, baseProps, "初心者", skills, equits);
    }


}

module.exports = 初心者;