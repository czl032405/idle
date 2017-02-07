var Hero = require("./hero.js");
var BaseProps = require("../base-props");
class 战士 extends Hero {
    constructor(name, baseProps, skills, equits) {
        skills = skills || [];
        //skills.push() //技能加成
        //baseProps 属性加成
        super(name, baseProps, "战士", skills, equits);
    }
 
}

module.exports = 战士;