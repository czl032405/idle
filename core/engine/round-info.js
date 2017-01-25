class RoundInfo {
    constructor(o) {
        var defaultParam = {
            attacker: null,
            defender: null,

            delay: 0,
            skillName: "-",
            isAvoid: false,
            isParry: false,
            isCrit: false,
            isCounter:false,
            //数值变动
            a: {
                maxhp: 0,
                maxmp: 0,
                hp: 0,
                mp: 0,
                attack: 0,
                defense: 0,
                mattack: 0,
                mdefense: 0,
                speed: 0,
                critmult: 0,
                dropmult: 0,
                hit: 0,
                avoid: 0,
                parry: 0,
                crit: 0,
                counter:0,

            },
            d: {
                maxhp: 0,
                maxmp: 0,
                hp: 0,
                mp: 0,
                attack: 0,
                defense: 0,
                mattack: 0,
                mdefense: 0,
                speed: 0,
                critmult: 0,
                dropmult: 0,
                hit: 0,
                avoid: 0,
                parry: 0,
                crit: 0,
                counter:0,
            },




        }
        Object.assign(this, defaultParam, o);

    }

}

module.exports = RoundInfo;