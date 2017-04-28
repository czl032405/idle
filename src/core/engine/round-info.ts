import BattlePropsChange from './battle-props-change';
import Character from './entity/character/character';

class RoundInfo {
    isBuff: boolean = false //是否buff回合
    attacker: Character = null
    defender: Character = null
    delay: number = 0 //毫秒后执行
    aniDelay: number = 0 //执行时长
    skillName: string = "skillName"
    skillLv: number = 0
    skillProp: string = ""
    isAvoid: boolean = false
    isParry: boolean = false
    isCrit: boolean = false
    isCounter: boolean = false

    //数值变动
    a: BattlePropsChange = new BattlePropsChange()
    d: BattlePropsChange = new BattlePropsChange()


}




export default RoundInfo;