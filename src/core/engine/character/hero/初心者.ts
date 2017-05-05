import BaseProps from '../../base-props';
import Skill from '../../skill/skill';
import Equit from '../../equit/equit';
import Hero from './hero';

class 初心者 extends Hero {
    constructor(name:string, baseProps?:BaseProps, skills?:Skill[], equits?:Equit[]) {

        super(name, baseProps, skills, equits);
        this.levelUpProps={
            str: 2,
            dex: 2,
            agi: 2,
            vit: 2,
            int: 2,
            luk: 2
        }
    }


}

export default 初心者;