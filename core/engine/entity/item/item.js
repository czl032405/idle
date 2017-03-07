const fs = require('fs');
const path = require('path');
const Entity = require('../entity.js');
class Item extends Entity {
    constructor() {
        super();
        this.name = this.__proto__.constructor.name;
    }

    static build(name, lv) {
        var classPath = path.resolve(__dirname, `./${name}.js`);
        var exist = fs.existsSync(classPath);
        if (exist) {
            var ItemClass = require(classPath);
            return new ItemClass(lv);
        }
        return null;
    }

    apply(character) {

    }


    static canUse(hero) {
        return true;
    }



}
module.exports = Item;