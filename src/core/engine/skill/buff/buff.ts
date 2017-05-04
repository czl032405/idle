import Skill from '../skill';
import Character from '../../character/character';
import RoundInfo from '../../round-info';
class Buff extends Skill {
    interval: number  //主动触发时间间隔 -1不主动触发
    nextInterval: number
    times: number  //触发次数 -1无限次
    owner: Character //buff持有者


    constructor(lv: number = 1) {
        super(lv);
        this.interval = -1;
        this.nextInterval = this.interval;
        this.times = -1;
    }


    //首次装载行为，用于修改自身属性
    apply(character: Character) {
        this.owner = character;

    }

    remove() {
        this.owner.buffs = this.owner.buffs.filter(buff => buff != this);
    }

    preFire(friends: Character[], enimies: Character[]) {
        var owner = this.owner;
        this.nextInterval = this.interval;
        this.times > 0 && (this.times -= 1);
        this.times == 0 && this.remove();

        //demo
        var defenders = this.parseDefenders(enimies)
        var roundInfo = new RoundInfo(this.owner, defenders);
        roundInfo.isBuff = true;
        roundInfo.skill = this;

        return roundInfo;
    }

    fire(roundInfo: RoundInfo){
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