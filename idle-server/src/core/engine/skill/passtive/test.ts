import RoundInfo from '../../round-info';
import PasstiveSkill from './passtive';
import Character from '../../character/character';
import TestBuff from '../buff/test';
class TestPasstive extends PasstiveSkill {
    apply(character: Character) {
        super.apply(character);
        character.buffs.push(new TestBuff(this.lv));
    }
}

export default TestPasstive