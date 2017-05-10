import Skill from '../skill';
import Formula from '../../formula'
import RoundInfo from '../../round-info';

class PositiveSkill extends Skill {
    constructor(lv: number = 1) {
        super(lv);
    }

    attack(roundInfo: RoundInfo) {
        var attack = roundInfo.attacker.battleProps.attack;
        roundInfo.rbs[0].dc.hp=-attack;
    }

}
export default PositiveSkill;