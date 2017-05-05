import BattleProps from './battle-props';
import Equit from './equit/equit';
import BaseProps from './base-props';
import Character from './character/character';
import Hero from './character/hero/hero';
import Monster from './character/monster/monster';
import Skill from './skill/skill';
import Battle from "./battle";

const Engine = {
    buildBattle(A: Character[], B: Character[]) {
        var battle = new Battle(A, B);
        return battle;
    },
    buildHero(name: string, baseProps: BaseProps, skills?: Skill[], equits?: Equit[], job?: string) {
        var hero = Hero.build(name, baseProps, skills, equits, job);
        return hero;
    },
    buildBaseProps(obj: BaseProps) {
        return Object.assign(new BaseProps(), obj)
    },
    buildMonster(name: string, lv: number = 1, levelUpProps?: BaseProps) {
        var monster = Monster.build(name, lv, levelUpProps);
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