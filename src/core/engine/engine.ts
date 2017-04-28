import Equit from './entity/equit/equit';
import BaseProps from './base-props';
import Character from './entity/character/character';
import Hero from './entity/character/hero/hero';
import Monster from './entity/character/monster/monster';
import Skill from './entity/skill/skill';
import Battle from "./battle";

const Engine = {
    buildBattle(A: Character, B: Character) {
        var battle = new Battle(A, B);
        return battle;
    },
    buildHero(name: string, baseProps: BaseProps, skills?: Skill[], equits?: Equit[], job?: string) {
        var hero = Hero.build(name, baseProps, skills, equits, job);
        return hero;
    },
    buildBaseProps(obj:Object){
        return Object.assign(new BaseProps(),obj)
    },
    buildMonster(name: string, lv: number = 1) {
        var monster = Monster.build(name, lv);
        return monster;
    },
    buildSkill(name: string, lv: number = 1) {
        return Skill.build(name, lv);
    },
    buildEquit(name: string, lv: number = 1) {
        return Equit.build(name, lv);
    }

}

export default Engine;