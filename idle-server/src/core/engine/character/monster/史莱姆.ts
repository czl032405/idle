import Equit from '../../equit/equit';
import Skill from '../../skill/skill';
import BaseProps from '../../base-props';
import Monster from './monster';
class 史莱姆 extends Monster {

    constructor(name: string, lv: number, levelUpProps?: BaseProps, skills?: Skill[], equits?: Equit[]) {
        //生成测试怪的参数
        levelUpProps = levelUpProps || {
            str: 1,
            dex: 1,
            agi: 1,
            vit: 1,
            int: 1,
            luk: 1,
            exp:100,
        }

        super(name, lv, levelUpProps, skills, equits);
    }




}
export default 史莱姆;
