const EndReason = require('./end-reason.js');
const ResultInfo = require('./result-info.js');
const RoundInfo = require('./round-info');
const Character = require('../entity/character/character.js');
const Buff = require('../entity/skill/buff/buff.js');
class Battle {
    constructor(A, B) {
        this.A = A;
        this.B = B;
        this.duration = 0
    }

    run() {
        var roundInfos = [];
        var resultInfo = this.checkStatus();
        while (resultInfo.endReason == EndReason.None) {
            roundInfos.push(this.action());
            resultInfo = this.checkStatus();
        }
        return {
            roundInfos,
            resultInfo
        }


    }


    action() {
        var A = this.A;
        var B = this.B;
        var action = this.parseNextAction();
        var delay = action.nextInterval || action.battleProps.nextInterval;
        var roundInfo = null;
        this.duration += delay;
        A.buffs.forEach((b) => {
            b.nextInterval -= delay;
        })
        B.buffs.forEach((b) => {
            b.nextInterval -= delay;
        })
        A.battleProps.nextInterval -= delay;
        B.battleProps.nextInterval -= delay;

        if (action instanceof Buff) {
            roundInfo = action.fire()
        }
        if (action instanceof Character) {
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

        roundInfo.delay = delay;
        this.calRoundInfo(roundInfo);
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
        if (B.battleProps.nextInterval < action.nextInterval) {
            action = B;
        }

        return action;
    }

    calRoundInfo(roundInfo) {
        var A = this.A;
        var B = this.B;
        if (roundInfo.isAvoid || roundInfo.isParry) {
            roundInfo.d.hp < 0 && (roundInfo.d.hp = 0);
        }
        for(let i in roundInfo.a){
            A.battleProps[i]+=roundInfo.a[i];
        }
        for(let i in roundInfo.d){
            B.battleProps[i]+=roundInfo.d[i];
        }
    }
    checkStatus() {
         var A = this.A;
        var B = this.B;
        var resultInfo = new ResultInfo();
        if (A.battleProps.hp <= 0 && B.battleProps.hp <= 0) {
            resultInfo.endReason = EndReason.AllDie;
        }
        if (A.battleProps.hp <= 0) {
            resultInfo.endReason = EndReason.AttackerDie;
            resultInfo.winner = this.B;
            resultInfo.loser = this.A;
        }
        if (B.battleProps.hp <= 0) {
            resultInfo.endReason = EndReason.DefenderDie;
            resultInfo.winner = this.A;
            resultInfo.loser = this.B;
        }
        if (this.duration >= 300 * 1000) {
            resultInfo.endReason = EndReason.TimeOut;
        }

        resultInfo.duration = this.duration;
        return resultInfo;
    }
}

module.exports = Battle;