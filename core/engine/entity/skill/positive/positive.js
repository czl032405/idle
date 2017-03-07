const Skill = require('../skill.js');
const Formula = require('../../../formula.js')

class PositiveSkill extends Skill {
    constructor(lv) {
        super(lv);
    }

    attack(roundInfo) {
        roundInfo.aniDelay = 100;
        roundInfo.d.damage = Formula.damage(roundInfo.attacker.battleProps);
    }

}
module.exports = PositiveSkill;