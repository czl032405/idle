const Hero = require('./entity/character/hero/hero.js');
const Monster = require('./entity/character/monster/monster.js');
const Battle = require("./battle");
const Engine ={
    buildBattle(A, B) {
        var battle = new Battle(A, B);
        // var result = battle.run();
        return battle;
    },
    buildHero(name,job,baseProps,skills,equits){
        var hero = Hero.build(name,job,baseProps,skills,equits);
        return hero;
    },
    buildMonster(name,lv){
        var monster = Monster.build(name,lv);
        return monster;
    },


}

module.exports = Engine;