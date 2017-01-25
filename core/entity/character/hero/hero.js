var Character = require("../character.js");
class Hero extends Character {
    constructor(name, baseProps, job, skills, equits, learnedJobs, learnedSkills, bagEquits, bagItems) {
        super(name, baseProps, skills, equits);
        this.job = job;
        this.learnedJobs = learnedJobs; //[{name}]
        this.learnedSkills = learnedSkills; //[{name,lv}]
        this.bagEquits = bagEquits;
        this.bagItems = bagItems;
    }

    static build() {

    }

    learnSkill(name, lv = 1) {


    }
    levelUp() {

    }
}
module.exports = Hero;