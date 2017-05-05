import Equit from '../../equit/equit';
import Skill from '../../skill/skill';
import BaseProps from '../../base-props';
import Monster from './monster';
class 测试怪 extends Monster {

    constructor(name: string, lv: number, levelUpProps?: BaseProps, skills?: Skill[], equits?: Equit[]) {
        //生成测试怪的参数
        levelUpProps = levelUpProps || {
            str: 10,
            dex: 10,
            agi: 10,
            vit: 10,
            int: 10,
            luk: 233,
            exp:23333
        }
        skills = skills || [];
        equits = equits || [];

        super(name, lv, levelUpProps, skills, equits);
        //其他参数
        this.drops = [{
            name: "木棍",
            lv: 1,
            percent: 1,
        }]
    }

    levelUp() {
        var result = super.levelUp();
        if (this.baseProps.lv == 19) {
            result.skills.push({ name: '直接攻击', lv: 2 });
        }
        return result;

    }
}
export default 测试怪;
