import BaseProps from '../../../base-props';
import Skill from '../../skill/skill';
import Equit from '../../equit/equit';
import Hero from './hero';
class 盗贼 extends Hero {
    constructor(name:string, baseProps?:BaseProps, skills?:Skill[], equits?:Equit[]) {

        super(name, baseProps, skills, equits);
    }
 
}

export default 盗贼;