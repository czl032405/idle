import Formula from "./formula";
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
        var propArr = "maxhp maxmp attack defense mattack mdefense speed critmult dropmult hit avoid parry crit counter".split(" ");

        propArr.forEach(prop=>{
             Formula[prop] && (this[prop] = Formula[prop](baseProps));
        })
        this.hp = this.maxhp;
        this.mp = this.maxmp;
        this.nextInterval = this.interval;

    }

    get interval() {
        return Math.floor((270 - this.speed) * 0.02 * 1000);
    }

}

export default BattleProps;