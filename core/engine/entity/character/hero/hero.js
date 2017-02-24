const fs = require('fs');
const path = require('path');
const Character = require("../character.js");
const Data = require('../../../../data/data.js');
const Skill = require('../../skill/skill.js');
const Equit = require('../../equit/equit.js')
class Hero extends Character {
    constructor(name, baseProps, job, skills, equits) {
        super(name, baseProps, skills, equits);
        this.job = job;
    }

    static build(name, baseProps, job, skills, equits) {
        var classPath = path.resolve(__dirname, `./${job}.js`);
        var exist = fs.existsSync(classPath);
        // todo skills => class skill
        skills= skills.map(skill=>{
            return Skill.build(skill.name,skill.lv);
        })
        equits=equits.map(equit=>{
            return Equit.build(equit.name,equit.lv);
        })
        if (exist) {
            var HeroClass = require(classPath);
            var hero = new HeroClass(name, baseProps, skills, equits);
            return hero;
        }
        else {
            return new Hero(name, baseProps, job, skills, equits)
        }

    }


}
module.exports = Hero;