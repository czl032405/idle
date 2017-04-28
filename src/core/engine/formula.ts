import BaseProps from './base-props';
import BattleProps from './battle-props';

const Formula = {
    maxhp(baseProps:BaseProps) {
        return 2 * baseProps.str + 4 * baseProps.vit + baseProps.luk;
    },
    maxmp(baseProps:BaseProps) {
        return 3 * baseProps.int + baseProps.vit;
    },
    attack(baseProps:BaseProps) {
        return 3 * baseProps.str + baseProps.dex;
    },
    defense(baseProps:BaseProps) {
        return baseProps.vit;
    },
    mattack(baseProps:BaseProps) {
        return 3 * baseProps.int;
    },
    mdefense(baseProps:BaseProps) {
        return 3 * baseProps.int;
    },
    speed(baseProps:BaseProps) {
        var agi=baseProps.agi;
        var dex=baseProps.dex;
        return 200 - 40 * ((250 - agi - dex / 4 ) / 250);
    },
    critmult(baseProps:BaseProps) {
        return 3 * baseProps.dex;
    },
    dropmult(baseProps:BaseProps) {
        return 1 + baseProps.luk / 200;
    },
    hit(baseProps:BaseProps) {
        return (baseProps.dex / (baseProps.dex + 100)) * 4;
    },
    avoid(baseProps:BaseProps) {
        return (baseProps.agi / (baseProps.agi + 100)) * 4;
    },
    parry(baseProps:BaseProps) {
        return (baseProps.vit + baseProps.luk + baseProps.agi) / ((baseProps.vit + baseProps.luk + baseProps.agi) * 2 + 1000);
    },
    crit(baseProps:BaseProps) {
        return (baseProps.luk + baseProps.dex) / ((baseProps.luk + baseProps.dex) + 500)
    },
    counter(baseProps:BaseProps) {
        return 0;
    },
    damage(battleProps:BattleProps) {
        return battleProps.attack;
    },
    mdamage(battleProps:BattleProps) {
        return battleProps.mattack;
    },
    reduceDamage(damage:number, battleProps:BattleProps) {
        var damage= damage * battleProps.defense/(battleProps.defense+100)-battleProps.defense;
        damage=damage<0?0:damage;
        return damage;
    },
    reduceMDamage(mdamage:number, battleProps:BattleProps) {
        var mdamage= mdamage * battleProps.mdefense/(battleProps.mdefense+100)-battleProps.mdefense;
        mdamage=mdamage<0?0:mdamage;
        return mdamage;
    }





}

 export default Formula;