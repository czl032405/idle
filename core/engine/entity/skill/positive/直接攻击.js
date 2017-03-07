const PositiveSkill = require('./positive.js');
const Formula = require('../../../formula.js')
class 直接攻击 extends PositiveSkill {
    constructor(lv) {
        super(lv);
    }

    attack(roundInfo) {
        super.attack(roundInfo);
        roundInfo.d.damage = Formula.damage(roundInfo.attacker.battleProps) + 1;
    }

}

module.exports = 直接攻击;