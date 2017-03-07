const PasstiveSkill = require('./passtive.js');
const 属性土 = require('../buff/属性土.js')
class 魔法掌握土 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 属性土(this.lv));
    }
}