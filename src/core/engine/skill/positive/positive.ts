import Skill  from '../skill';
import Formula  from '../../formula'
import RoundInfo from '../../round-info';

class PositiveSkill extends Skill {
    constructor(lv:number=1) {
        super(lv);
    }

    attack(roundInfo:RoundInfo) {
        roundInfo.aniDelay = 100;
    }

}
export default PositiveSkill;