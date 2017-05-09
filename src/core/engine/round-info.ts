import RoundBattleInfo from './round-battle-info';
import Character from './character/character';
import Skill from './skill/skill';
class RoundInfo {
    isBuff: boolean = false //是否buff回合
    delay: number = 0 //毫秒后执行
    aniDelay: number = 900 //执行时长 最小500
    attacker: Character = null
    skill: Skill = null
    defenders: Character[] = []
    rbs: RoundBattleInfo[] = []


    constructor(attacker: Character, defenders: Character[]) {
        this.attacker = attacker;
        this.defenders = defenders;

        this.defenders.forEach(defender => {
            this.rbs.push(new RoundBattleInfo());
        })
    }

}




export default RoundInfo;