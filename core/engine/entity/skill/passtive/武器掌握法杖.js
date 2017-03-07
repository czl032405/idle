const PasstiveSkill = require('./passtive.js');
const 武器掌握加成法杖 = require('../buff/武器掌握加成法杖.js')
class 武器掌握法杖 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 武器掌握加成法杖(this.lv));
    }
}