const PasstiveSkill = require('./passtive.js');
const 属性火 = require('../buff/属性火.js')
class 魔法掌握火 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 属性火(this.lv));
    }
}