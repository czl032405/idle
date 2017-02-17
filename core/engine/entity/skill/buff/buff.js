var Skill = require('../skill.js');
var PasstiveSkill = require('../passtive/passtive.js')
var RoundInfo = require('../../../round-info.js');
class Buff extends PasstiveSkill {
    constructor(name, lv) {
        super(name, lv);
        this.interval = 999999;
        this.nextInterval = this.interval;
        this.times = -1;
    }


    apply(origin, receiver) {
        this.origin = origin;
        this.receiver = receiver
    }

    remove() {
        var index = this.receiver.buffs.indexOf(this);
        index >= 0 && this.receiver.buffs.splice(index, 1)
    }

    fire() {
        var origin = this.origin;
        var receiver = this.receiver;
        this.nextInterval = this.interval;
        this.times > 0 && (this.times -= 1);
        this.times == 0 && this.remove();
        var roundInfo = new RoundInfo();
        roundInfo.attacker = origin;
        roundInfo.defender = receiver;
        roundInfo.isBuff=true;
        return roundInfo;
    }

    onBeforeAttack(roundInfo) {
        return roundInfo;
    }

    onAfterAttack(roundInfo) {
        return roundInfo
    }

    onBeforeDefend(roundInfo) {
        return roundInfo;
    }

    onAfterDefend(roundInfo) {
        return roundInfo;
    }





}
module.exports = Buff;