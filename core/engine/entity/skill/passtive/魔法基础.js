const PasstiveSkill = require('./passtive.js');
const 魔法基础加成 = require('../buff/魔法基础加成.js')
class 魔法基础 extends PasstiveSkill{
    constructor(lv){
        super(lv)
    }
    apply(character){
        character.buffs.push(new 魔法基础加成(this.lv));
    }
}