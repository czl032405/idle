import BaseProps from '../../../base-props';
import job from '../../../../setting/job';
import * as path from 'path';
import * as fs from 'fs';
import hero from '../../../../../server/ctrls/hero';
import Character from '../character';
import Equit from '../../equit/equit';
import Skill from '../../skill/skill';

class Hero extends Character {
    job: string
    constructor(name: string, baseProps?: BaseProps, skills?: Skill[], equits?: Equit[]) {
        super(name, baseProps, skills, equits);
        this.job = Object.getPrototypeOf(this).constructor.name || "error job";
    }

    static build(name: string, baseProps?: BaseProps, skills?: Skill[], equits?: Equit[], job?: String):Hero {
         var ext = /\.ts$/.test(__filename)?'ts':'js';
        var classPath = path.resolve(__dirname, `./${job}.${ext}`);
        var exist = fs.existsSync(classPath);

        if (exist) {
            var HeroClass = require(classPath).default;
            var hero = new HeroClass(name, baseProps, skills, equits);
            return hero;
        }
        else {
            return new Hero(name, baseProps, skills, equits)
        }

    }


}
export default Hero;