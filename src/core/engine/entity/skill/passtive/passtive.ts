import Character from '../../character/character';
import Skill  from '../skill';
class PasstiveSkill extends Skill {
    constructor(lv:number=1) {
        super(lv);
    }

    apply(character:Character){
        
    }




}
export default PasstiveSkill;