const PositiveSkill = require('./positive.js');
class 直接攻击 extends PositiveSkill {
    constructor(lv) {
        lv = lv || 1;
        super('直接攻击', lv);
    }

    attack(roundInfo) {
        super.attack(roundInfo);
        roundInfo.d.hp -= 2;
    }

}

module.exports = 直接攻击;