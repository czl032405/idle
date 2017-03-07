const Formula = {
    maxhp(baseProps) {
        return 2 * baseProps.str + 4 * baseProps.vit + baseProps.luk;
    },
    maxmp(baseProps) {
        return 3 * baseProps.int + baseProps.vit;
    },
    attack(baseProps) {
        return 3 * baseProps.str + baseProps.dex;
    },
    defense(baseProps) {
        return baseProps.vit;
    },
    mattack(baseProps) {
        return 3 * baseProps.int;
    },
    mdefense(baseProps) {
        return 3 * baseProps.int;
    },
    speed(baseProps) {
        var agi=baseProps.agi;
        var dex=baseProps.dex;
        return 200 - 40 * ((250 - agi - dex / 4 ) / 250);
    },
    critmult(baseProps) {
        return 3 * baseProps.dex;
    },
    dropmult(baseProps) {
        return 1 + baseProps.luk / 200;
    },
    hit(baseProps) {
        return (baseProps.hit / (baseProps.hit + 100)) * 4;
    },
    avoid(baseProps) {
        return (baseProps.agi / (baseProps.agi + 100)) * 4;
    },
    parry(baseProps) {
        return (baseProps.vit + baseProps.luk + baseProps.agi) / ((baseProps.vit + baseProps.luk + baseProps.agi) * 2 + 1000);
    },
    crit(baseProps) {
        return (baseProps.luk + baseProps.dex) / ((baseProps.luk + baseProps.dex) + 500)
    },
    counter(baseProps) {
        return 0;
    },
    damage(battleProps) {
        return battleProps.attack;
    },
    mdamage(battleProps) {
        return battleProps.mattack;
    },
    reduceDamage(damage, battleProps) {
        var damage= damage * battleProps.defense/(battleProps.defense+100)-battleProps.defense;
        damage=damage<0?0:damage;
        return damage;
    },
    reduceMDamage(mdamage, battleProps) {
        var mdamage= mdamage * battleProps.mdefense/(battleProps.mdefense+100)-battleProps.mdefense;
        mdamage=mdamage<0?0:mdamage;
        return mdamage;
    }





}

module.exports = Formula;