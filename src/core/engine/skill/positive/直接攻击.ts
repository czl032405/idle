import RoundInfo from '../../round-info';
import PositiveSkill from './positive';
import Formula from '../../formula'
import Character from '../../character/character';
class 直接攻击 extends PositiveSkill {
    constructor(lv: number = 1) {
        super(lv);
    }
    parseDefenders(enimies: Character[]){
        return super.parseDefenders(enimies,enimies.length)
    }

    attack(roundInfo: RoundInfo) {
        super.attack(roundInfo);
       roundInfo.rbs.forEach(rb=>{
           rb.dc.hp=-1
       })
    }

}

export default 直接攻击;