var Skill = require('../skill.js');
class PositiveSkill extends Skill {
    constructor(name, lv) {
        super(name,lv);
    }

    attack(roundInfo){
        roundInfo.aniDelay=100;
    }

}
module.exports = PositiveSkill;