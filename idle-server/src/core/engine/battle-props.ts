import F from "./formula";
import BaseProps from './base-props';
class BattleProps {
    maxhp: number = 1
    maxmp: number = 1
    hp: number = 1
    mp: number = 1
    attack: number = 1
    defense: number = 1
    mattack: number = 1
    mdefense: number = 1
    speed: number = 1
    critmult: number = 2
    dropmult: number = 1
    hit: number = 1
    avoid: number = 0
    parry: number = 0
    crit: number = 0
    counter: number = 0
    nextInterval:number=1
    constructor(baseProps: BaseProps) {
        Object.keys(F.battleProps).forEach(key=>{
            this[key]!=undefined && (this[key]=F.battleProps[key](baseProps));
        })
        this.hp = this.maxhp;
        this.mp = this.maxmp;
        this.nextInterval = this.interval;
    }

    get interval() {
      return F.battle.interval(this);
    }

}

export default BattleProps;