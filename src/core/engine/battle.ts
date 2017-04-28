import Monster from './entity/character/monster/monster';
import ExpSetting from '../setting/exp';
import EndReason from './end-reason';
import Character from './entity/character/character';
import Buff from './entity/skill/buff/buff';
import ResultInfo from './result-info';
import RoundInfo from './round-info';

interface BattleResult {
    roundInfos: RoundInfo[]
    resultInfo: ResultInfo
    A: Character
    B: Character
}

class Battle {
    A: Character
    B: Character
    duration: number = 0
    constructor(A: Character, B: Character) {
        this.A = A;
        this.B = B;
    }

    run() {
        var roundInfos: RoundInfo[] = [];
        var resultInfo: ResultInfo = this.checkStatus();
        var A: Character = this.A.getCurrentStatus();
        var B: Character = this.B.getCurrentStatus();
        while (resultInfo.endReason == EndReason.None) {
            roundInfos.push(this.action());
            resultInfo = this.checkStatus();
        }

        var result: BattleResult = {
            roundInfos,
            resultInfo,
            A,
            B
        }

        return result;


    }


    action(): RoundInfo {
        var A: Character = this.A;
        var B: Character = this.B;
        var action: Character | Buff = this.parseNextAction();
        var delay: number = action instanceof Buff ? action.nextInterval : action.battleProps.nextInterval;
        var roundInfo: RoundInfo = null;

        //calNextInerval
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




    parseNextAction(): Character | Buff {
        var A = this.A;
        var B = this.B;
        var action: Character | Buff = null;

        A.buffs.forEach((b: Buff) => {
            action = action || b;
            if (action instanceof Buff && b.nextInterval < action.nextInterval) {
                action = b;
            }
        });
        B.buffs.forEach((b) => {
            action = action || b;
            if (action instanceof Buff && b.nextInterval < action.nextInterval) {
                action = b;
            }
        });
        action = action || A;
        if (action instanceof Buff && A.battleProps.nextInterval < action.nextInterval) {
            action = A;
        }
        if (action instanceof Buff && B.battleProps.nextInterval < action.nextInterval) {
            action = B;
        }
        if (action instanceof Character && B.battleProps.nextInterval < action.battleProps.nextInterval) {
            action = B;
        }

        return action;
    }

    checkStatus(): ResultInfo {
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


            if (B instanceof Monster) {
                var drops = B.drop();
                resultInfo.dropExp = drops.dropExp;
                resultInfo.dropItems = drops.dropItems;
                resultInfo.dropEquits = drops.dropEquits;
            }


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

export default Battle;
export {BattleResult};