import Skill from '../skill';
import Character from '../../character/character';
import RoundInfo from '../../../round-info';
class Buff extends Skill {
    interval: number
    nextInterval: number
    times: number
    origin: Character
    receiver: Character

    constructor(lv: number = 1) {
        super(lv);
        this.interval = 999999;
        this.nextInterval = this.interval;
        this.times = -1;
    }


    apply(origin: Character, receiver: Character) {
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
        roundInfo.isBuff = true;
        return roundInfo;
    }

    onBeforeAttack(roundInfo: RoundInfo) {
        return roundInfo;
    }

    onAfterAttack(roundInfo: RoundInfo) {
        return roundInfo
    }

    onBeforeDefend(roundInfo: RoundInfo) {
        return roundInfo;
    }

    onAfterDefend(roundInfo: RoundInfo) {
        return roundInfo;
    }





}
export default Buff;