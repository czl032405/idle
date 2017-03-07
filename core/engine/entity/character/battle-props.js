const Formula = require("../../formula.js");
class BattleProps{
    constructor(baseProps){
        var defaultParm={
            maxhp:1,
            maxmp:1,
            hp:1,
            mp:1,
            attack:1,
            defense:1,
            mattack:1,
            mdefense:1,
            speed:1,
            critmult:2,
            dropmult:1,

            hit:1,
            avoid:0,
            parry:0,
            crit:0,
            counter:0,
        }
        Object.assign(this,defaultParm);

        var propArr="maxhp maxmp attack defense mattack mdefense speed critmult dropmult hit avoid parry crit counter".split(" "); 
        for(let i in propArr){
            this[propArr[i]] = Formula[propArr[i]](baseProps);
        }
        this.hp=this.maxhp;
        this.mp = this.maxmp;


        this.nextInterval = this.interval;

    }

    get interval(){
         return Math.floor((200-this.speed)*0.02*1000);
    }

}

module.exports = BattleProps;