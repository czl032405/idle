const PasstiveSkill = require('./passtive.js');
const 武器掌握加成弓箭 = require('../buff/武器掌握加成弓箭.js')
class 武器掌握弓箭 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 武器掌握加成弓箭(this.lv));
    }
}