const PasstiveSkill = require('./passtive.js');
const 武器基础加成 = require('../buff/武器基础加成.js')
class 武器基础 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 武器基础加成(this.lv));
    }
}