import BattlePropsChange from './battle-props-change';
import Character from './character/character';

class RoundBattleInfo {
        isAvoid: boolean = false
        isParry: boolean = false
        isCrit: boolean = false
        isCounter: boolean = false

        ac: BattlePropsChange = new BattlePropsChange();
        dc: BattlePropsChange = new BattlePropsChange();

}

export default RoundBattleInfo;