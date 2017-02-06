const fs = require('fs');
const path = require('path');
const Entity = require('../entity.js');
class Equit extends Entity {
    constructor(name, lv) {
        super(name);
        this.lv = lv;
 
    }

    static build(name,lv){
        var classPath = path.resolve(__dirname, `./${name}.js`);
        var exist = fs.existsSync(classPath);
        if (exist) {
            var EquitClass = require(classPath);
            return new EquitClass(lv);
        }
        return null;
    }

    apply(character){
        
    }

    /**
     * @param {Object} hero 持久层hero
     */
    static canEquit(hero){

    }



}
module.exports = Equit;