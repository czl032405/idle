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


        this.maxhp = baseProps.str+baseProps.vit;
        this.hp = this.maxhp;


        this.nextInterval = this.interval;

    }

    get interval(){
        return Math.floor(1000/this.speed);
    }

}

module.exports = BattleProps;