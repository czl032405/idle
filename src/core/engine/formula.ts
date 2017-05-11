import BaseProps from './base-props';
import BattleProps from './battle-props';

const F = {
    battleProps: {
        maxhp({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 2 * str + 4 * vit + luk;
        },
        maxmp({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 3 * int + vit;
        },
        attack({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 3 * str + dex;
        },
        defense({ str, int, vit, agi, dex, luk }: BaseProps) {
            return vit;
        },
        mattack({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 3 * int;
        },
        mdefense({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 3 * int;
        },
        speed({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 200 - 40 * ((250 - agi - dex / 4) / 250);
        },
        critmult({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 3 * dex;
        },
        dropmult({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 1 + luk / 200;
        },
        hit({ str, int, vit, agi, dex, luk }: BaseProps) {
            return (dex / (dex + 100)) * 4;
        },
        avoid({ str, int, vit, agi, dex, luk }: BaseProps) {
            return (agi / (agi + 100)) * 4;
        },
        parry({ str, int, vit, agi, dex, luk }: BaseProps) {
            return (vit + luk + agi) / ((vit + luk + agi) * 2 + 1000);
        },
        crit({ str, int, vit, agi, dex, luk }: BaseProps) {
            return (luk + dex) / ((luk + dex) + 500)
        },
        counter({ str, int, vit, agi, dex, luk }: BaseProps) {
            return 0;
        },
    },
    battle: {
        interval(battleProps: BattleProps) {
            var { speed } = battleProps;
            return Math.floor((270 - speed) * 0.02 * 1000);
        },
        damage(battleProps: BattleProps) {
            return battleProps.attack;
        },
        mdamage(battleProps: BattleProps) {
            return battleProps.mattack;
        },
        reduceDamage(damage: number, battleProps: BattleProps) {
            var damage = damage * battleProps.defense / (battleProps.defense + 100) - battleProps.defense;
            damage = damage < 0 ? 0 : damage;
            return damage;
        },
        reduceMDamage(mdamage: number, battleProps: BattleProps) {
            var mdamage = mdamage * battleProps.mdefense / (battleProps.mdefense + 100) - battleProps.mdefense;
            mdamage = mdamage < 0 ? 0 : mdamage;
            return mdamage;
        }

    },
    skllls: {

    }






}

export default F;