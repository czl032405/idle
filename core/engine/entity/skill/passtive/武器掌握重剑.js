const PasstiveSkill = require('./passtive.js');
const 武器掌握加成重剑 = require('../buff/武器掌握加成重剑.js')
class 武器掌握重剑 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 武器掌握加成重剑(this.lv));
    }
}