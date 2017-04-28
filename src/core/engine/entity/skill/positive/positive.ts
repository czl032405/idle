import Skill  from '../skill';
import Formula  from '../../../formula'
import RoundInfo from '../../../round-info';

class PositiveSkill extends Skill {
    constructor(lv:number=1) {
        super(lv);
    }

    attack(roundInfo:RoundInfo) {
        roundInfo.aniDelay = 100;
        roundInfo.d.damage = Formula.damage(roundInfo.attacker.battleProps);
    }

}
export default PositiveSkill;