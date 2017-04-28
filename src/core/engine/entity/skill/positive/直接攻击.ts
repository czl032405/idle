import PositiveSkill  from './positive';
import Formula  from '../../../formula'
class 直接攻击 extends PositiveSkill {
    constructor(lv:number=1) {
        super(lv);
    }

    attack(roundInfo) {
        super.attack(roundInfo);
        roundInfo.d.damage = Formula.damage(roundInfo.attacker.battleProps) + 1;
    }

}

export default 直接攻击;