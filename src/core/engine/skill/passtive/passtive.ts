import Character from '../../character/character';
import Skill  from '../skill';
class PasstiveSkill extends Skill {
    constructor(lv:number=1) {
        super(lv);
    }
    //首次装载行为，用于添加buff
    apply(character:Character){
        
    }




}
export default PasstiveSkill;