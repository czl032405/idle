const Hero = require('./entity/character/hero/hero.js');
const Monster = require('./entity/character/monster/monster.js');
const Skill = require('./entity/skill/skill.js');
const Battle = require("./battle");
const Engine = {
    buildBattle(A, B) {
        var battle = new Battle(A, B);
        return battle;



    },
    buildHero(name, baseProps, skills, equits, job) {
        var hero = Hero.build(name, baseProps, skills, equits, job);
        return hero;
    },
    buildMonster(name, lv) {
        var monster = Monster.build(name, lv);
        return monster;
    },
    buildSkill(name, lv) {
        return Skill.build(name, lv);
    }

}

module.exports = Engine;