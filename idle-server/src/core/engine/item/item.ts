import Character from '../character/character';
import * as fs from 'fs';
import * as path from 'path';
import Entity from '../entity';

class Item extends Entity {
    lv: number = 1
    constructor(lv?: number) {
        super();
        lv && (this.lv = lv);
        this.name = Object.getPrototypeOf(this).constructor.name;
    }

    static build(name: string, lv: number = 1):Item {
        var ext = /\.ts$/.test(__filename) ? 'ts' : 'js';
        var classPath = path.resolve(__dirname, `./${name}.${ext}`);
        var exist = fs.existsSync(classPath);
        if (exist) {
            var ItemClass = require(classPath).default;
            return new ItemClass(lv);
        }
        return null;
    }

    apply(character:Character) {

    }


    static canUse(hero) {
        return true;
    }



}
export default Item;