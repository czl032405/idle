const EndReason = require('./end-reason.js');
const ResultInfo = require('./result-info.js');
const RoundInfo = require('./round-info');
const Character = require('./entity/character/character.js');
const Buff = require('./entity/skill/buff/buff.js');
const ExpSetting = require('../setting/exp.json');
class Battle {
    constructor(A, B) {
        this.A = A;
        this.B = B;
        this.duration = 0
    }

    run() {
        var roundInfos = [];
        var resultInfo = this.checkStatus();
        var A = this.A.getCurrentStatus();
        var B = this.B.getCurrentStatus();
        while (resultInfo.endReason == EndReason.None) {
            roundInfos.push(this.action());
            resultInfo = this.checkStatus();
        }


        return {
            roundInfos,
            resultInfo,
            A,
            B
        }


    }


    action() {
        var A = this.A;
        var B = this.B;
        var action = this.parseNextAction();
        var delay = action.nextInterval || action.battleProps.nextInterval;
        var roundInfo = null;
        A.buffs.forEach((b) => {
            b.nextInterval -= delay;
        })
        B.buffs.forEach((b) => {
            b.nextInterval -= delay;
        })
        A.battleProps.nextInterval -= delay;
        B.battleProps.nextInterval -= delay;

        if (action instanceof Buff) {
            action.nextInterval = action.interval;
            roundInfo = action.fire();
        }
        if (action instanceof Character) {
            action.battleProps.nextInterval = action.battleProps.interval;
            var attacker = action;
            var defender = action == A ? B : A
            roundInfo = attacker.preAttack(defender);
            attacker.buffs.forEach((b) => {
                b.onBeforeAttack(roundInfo);
            });
            attacker.attack(roundInfo);
            attacker.buffs.forEach((b) => {
                b.onAfterAttack(roundInfo);
            });
            defender.buffs.forEach((b) => {
                b.onBeforeDefend(roundInfo);
            });
            defender.defend(roundInfo);
            defender.buffs.forEach((b) => {
                b.onAfterDefend(roundInfo);
            });
        }

        //cal roundInfo
        roundInfo.delay = delay;
        this.duration += roundInfo.delay;
        this.duration += roundInfo.aniDelay;
        roundInfo.a.hp -= roundInfo.a.damage;
        roundInfo.a.hp -= roundInfo.a.mdamage;
        roundInfo.d.hp -= roundInfo.d.damage;
        roundInfo.d.hp -= roundInfo.d.mdamage;
        if (roundInfo.isAvoid || roundInfo.isParry) {
            roundInfo.d.hp < 0 && (roundInfo.d.hp = 0);
        }
        var attacker = A.name == roundInfo.attacker.name ? A : B;
        var defender = attacker == A ? B : A;
        for (let i in roundInfo.a) {
            if (attacker.battleProps[i] != undefined) {
                attacker.battleProps[i] += roundInfo.a[i];
            }

        }
        for (let i in roundInfo.d) {
            if (defender.battleProps[i] != undefined) {
                defender.battleProps[i] += roundInfo.d[i];
            }
        }
        roundInfo.attacker = roundInfo.attacker.getRoundInfoStatus();
        roundInfo.defender = roundInfo.defender.getRoundInfoStatus();
        return roundInfo;
    }




    parseNextAction() {
        var A = this.A;
        var B = this.B;
        var action = A;

        A.buffs.forEach((b) => {
            if (b.nextInterval < action.nextInterval) {
                action = b;
            }
        });
        B.buffs.forEach((b) => {
            if (b.nextInterval < action.nextInterval) {
                action = b;
            }
        });
        if (A.battleProps.nextInterval < action.nextInterval) {
            action = A;
        }
        if (B.battleProps.nextInterval < (action.nextInterval || action.battleProps.nextInterval)) {
            action = B;
        }

        return action;
    }

    checkStatus() {
        var A = this.A;
        var B = this.B;
        var resultInfo = new ResultInfo();
        resultInfo.maxexp = ExpSetting[this.A.baseProps.lv];
        if (A.battleProps.hp <= 0 && B.battleProps.hp <= 0) {
            resultInfo.battleDelay = 6000;
            resultInfo.endReason = EndReason.AllDie;
        }
        if (A.battleProps.hp <= 0) {
            resultInfo.battleDelay = 6000;
            resultInfo.endReason = EndReason.AttackerDie;
            resultInfo.winner = this.B.name;
            resultInfo.loser = this.A.name;
        }
        if (B.battleProps.hp <= 0) {
            resultInfo.endReason = EndReason.DefenderDie;
            resultInfo.winner = this.A.name;
            resultInfo.loser = this.B.name;

            var drops = this.B.drop();
            resultInfo.dropExp = drops.dropExp;
            resultInfo.dropItems = drops.dropItems;
            resultInfo.dropEquits = drops.dropEquits;

            //handler drop
            var newExp = this.A.baseProps.exp + resultInfo.dropExp;
            var newLv = this.A.baseProps.lv;
            while (ExpSetting[newLv] <= newExp) {
                newLv++;
            }
            resultInfo.levelup = newLv - this.A.baseProps.lv;
            resultInfo.maxexp = ExpSetting[newLv];



        }
        if (this.duration >= 300 * 1000) {
            resultInfo.endReason = EndReason.TimeOut;
        }

        resultInfo.duration = this.duration;
        return resultInfo;
    }
}

module.exports = Battle;