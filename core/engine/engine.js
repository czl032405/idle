const Hero = require('./entity/character/hero/hero.js');
const Monster = require('./entity/character/monster/monster.js');
const Battle = require("./battle");
const Engine = {
    buildBattle(A, B) {
        var battle = new Battle(A, B);
        return battle;



    },
    buildHero(name,baseProps ,job, skills, equits) {
        var hero = Hero.build(name,baseProps, job,  skills, equits);
        return hero;
    },
    buildMonster(name, lv) {
        var monster = Monster.build(name, lv);
        return monster;
    },


}

module.exports = Engine;