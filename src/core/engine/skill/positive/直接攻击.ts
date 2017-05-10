import RoundInfo from '../../round-info';
import PositiveSkill from './positive';
import Formula from '../../formula'
import Character from '../../character/character';
class 直接攻击 extends PositiveSkill {
    constructor(lv: number = 1) {
        super(lv);
    }
    parseDefenders(enimies: Character[]){
        return super.parseDefenders(enimies,1)
    }

    attack(roundInfo: RoundInfo) {
        super.attack(roundInfo);
    }

}

export default 直接攻击;