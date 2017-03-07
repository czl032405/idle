const PasstiveSkill = require('./passtive.js');
const 属性水 = require('../buff/属性水.js')
class 魔法掌握水 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 属性水(this.lv));
    }
}