const PasstiveSkill = require('./passtive.js');
const 属性风 = require('../buff/属性风.js')
class 魔法掌握风 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 属性风(this.lv));
    }
}