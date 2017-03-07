const PasstiveSkill = require('./passtive.js');
const 武器掌握加成匕首 = require('../buff/武器掌握加成匕首.js')
class 武器掌握匕首 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 武器掌握加成匕首(this.lv));
    }
}