import Monster from './character/monster/monster';
import ExpSetting from '../setting/exp';
import EndReason from './end-reason';
import Character from './character/character';
import Buff from './skill/buff/buff';
import ResultInfo from './result-info';
import RoundInfo from './round-info';

interface BattleResult {
    roundInfos: RoundInfo[]
    resultInfo: ResultInfo
    A: Character[]
    B: Character[]
}

class Battle {
    A: Character[]
    B: Character[]
    duration: number = 0
    isTvT: boolean = false
    constructor(A: Character[], B: Character[]) {
        var index = 0;
        [A, B].forEach(characters => {
            characters.forEach(character => {
                character.index = ++index;
            })
        })
        this.A = A;
        this.B = B;
    }

    run() {
        var roundInfos: RoundInfo[] = [];
        var resultInfo: ResultInfo = this.checkStatus();
        var A: Character[] = this.A.map(character => character.getStatus())
        var B: Character[] = this.B.map(character => character.getStatus())
        while (resultInfo.endReason == "None") {
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
        var A: Character[] = this.A;
        var B: Character[] = this.B;
        var action: Character | Buff = this.parseNextAction();
        var delay: number = action instanceof Buff ? action.nextInterval : action.battleProps.nextInterval;
        var roundInfo: RoundInfo = null;

        //calNextInerval
        [A, B].forEach(characters => {
            characters.forEach(character => {
                character.battleProps.nextInterval -= delay;
                character.buffs.forEach(buff => {
                    buff.nextInterval -= delay;
                })
            })
        });

        //action
        var attacker = action instanceof Buff ? action.owner : action;
        var friends = A.find(character => character == attacker) ? A : B;
        var enimies = A == friends ? B : A;
        roundInfo = action instanceof Buff ? action.preFire(friends, enimies) : attacker.preAttack(friends, enimies);
        var defenders = roundInfo.defenders;
        attacker.buffs.forEach((b) => {
            b.onBeforeAttack(roundInfo);
        });
        action instanceof Buff ? action.fire(roundInfo) : attacker.attack(roundInfo);;
        attacker.buffs.forEach((b) => {
            b.onAfterAttack(roundInfo);
        });
        defenders.forEach(defender => {
            defender.buffs.forEach((buff) => {
                buff.onBeforeDefend(roundInfo);
            });
            defender.defend(roundInfo);
            defender.buffs.forEach((buff) => {
                buff.onAfterDefend(roundInfo);
            });
        })

        //cal roundInfo
        roundInfo.delay = delay;
        this.duration += roundInfo.delay;
        this.duration += roundInfo.aniDelay;
        roundInfo.rbs.forEach((rb, index) => {
            if (rb.isAvoid || rb.isParry) {
                rb.dc.hp = 0;
            }
            Object.keys(rb.ac).forEach(propKey => {
                if (roundInfo.attacker.battleProps[propKey] != undefined) {
                    roundInfo.attacker.battleProps[propKey] += rb.ac[propKey];
                }
            })
            Object.keys(rb.dc).forEach(propKey => {
                if (roundInfo.defenders[index].battleProps[propKey] != undefined) {
                    roundInfo.defenders[index].battleProps[propKey] += rb.dc[propKey];
                }
            })
        })


        roundInfo.attacker = roundInfo.attacker.getStatus();
        roundInfo.defenders= roundInfo.defenders.map(defender => defender.getStatus());
        return roundInfo;
    }




    parseNextAction(): Character | Buff {
        var A = this.A;
        var B = this.B;
        var action: Character | Buff = null;

        [A, B].forEach(characters => {
            characters.forEach(character => {
                character.buffs.forEach(buff => {
                    action = action || buff;
                    if (action instanceof Buff && buff.nextInterval < action.nextInterval) {
                        action = buff;
                    }
                });
            });
        });


        [A, B].forEach(characters => {
            characters.forEach(character => {
                action = action || character;
                if (action instanceof Buff && character.battleProps.nextInterval < action.nextInterval) {
                    action = character;
                }
                if (action instanceof Character && character.battleProps.nextInterval < action.battleProps.nextInterval) {
                    action = character;
                }
            })
        });
        return action;
    }

    checkStatus(): ResultInfo {
        var A = this.A;
        var B = this.B;
        var resultInfo = new ResultInfo();
        resultInfo.duration = this.duration;
        var delays = [1000, 5000, 10000]
        if (!A.find(c => c.battleProps.hp > 0) && !B.find(c => c.battleProps.hp > 0)) {
            resultInfo.battleDelay = delays[2];
            resultInfo.endReason = "AllDie";
        }

        if (A.find(c => c.battleProps.hp > 0) && !B.find(c => c.battleProps.hp > 0)) {
            resultInfo.battleDelay = delays[0];
            resultInfo.endReason = "DefenderDie";
            if (A.find(c => c.battleProps.hp <= 0)) {
                resultInfo.battleDelay = delays[1];
            }

        }
        if (!A.find(c => c.battleProps.hp > 0) && B.find(c => c.battleProps.hp > 0)) {
            resultInfo.battleDelay = delays[2];
            resultInfo.endReason = "AttackerDie";

        }
        if (this.duration >= 300 * 1000) {
            resultInfo.endReason = "TimeOut";
        }


        if (resultInfo.endReason == "DefenderDie" && !this.isTvT) {
            var drops = B.map(b => b.drop());
            resultInfo.dropEquits = drops.reduce((acc, drop) => {
                return acc.concat(drop.dropEquits);
            }, []);
            resultInfo.dropItems = drops.reduce((acc, drop) => {
                return acc.concat(drop.dropEquits);
            }, []);
            resultInfo.dropExp = drops.reduce((acc, drop) => {
                return acc += drop.dropExp;
            }, 0);
            resultInfo.dropExp=Math.floor(resultInfo.dropExp/A.length);
            A.forEach(a=>{
                a.baseProps.exp+=resultInfo.dropExp;
                while(ExpSetting[a.baseProps.lv]<=a.baseProps.exp){
                    a.baseProps.lv++;
                }
            })

        }

        return resultInfo;
    }
}

export default Battle;
export { BattleResult };