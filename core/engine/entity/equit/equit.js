const fs = require('fs');
const path = require('path');
const Entity = require('../entity.js');
class Equit extends Entity {
    constructor(lv) {
        super();
        this.name=this.__proto__.constructor.name;
        this.lv = lv || 1;//精炼等级
        this.type = "";

    }

    static build(name, lv) {
        var classPath = path.resolve(__dirname, `./${name}.js`);
        var exist = fs.existsSync(classPath);
        if (exist) {
            var EquitClass = require(classPath);
            return new EquitClass(lv);
        }
        return null;
    }

    apply(character) {

    }





}
module.exports = Equit;