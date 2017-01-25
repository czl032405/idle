const Monster = require('../entity/character/monster/monster.js');
const Battle = require("./battle");
const Engine ={
    buildBattle(A, B) {
        var battle = new Battle(A, B);
        // var result = battle.run();
        return battle;
    },
    buildHero(name,job,baseProps,skills,equits){
        var HeroClass = require(`../entity/character/hero/${job}.js`);
        var hero = new HeroClass();
        return hero;
    },
    buildMonster(name,lv){
        var monster = Monster.build(name,lv);
        return monster;
        // var MonsterClass = require(`../entity/character/monster/${name}.js`);
        // var monster = new MonsterClass();
        // return monster;
    }

}

module.exports = Engine;