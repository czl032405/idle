var PasstiveSkill = require('./passtive');

class 坚硬皮肤 extends PasstiveSkill {
    constructor(lv) {
        super('坚硬皮肤', lv);
    }

    apply(character) {
        super.apply(character);
        character.battleProps.defense += (character.baseProps.vit * 2 * this.lv)
    }

  

}
module.exports = 坚硬皮肤;