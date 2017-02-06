var Monster = require("./monster.js");
var BaseProps = require("../base-props");
class 特殊怪 extends Monster {
    constructor(lv) {
        lv = lv || 1;
        var str = 99 * lv;
        var int = 99 * lv;
        var agi = 99 * lv;
        var vit = 99 * lv;
        var dex = 99 * lv;
        var luk = 99 * lv;
        super("特殊怪", new BaseProps({ lv, str, int, agi, vit, dex, luk }));

    }
}
module.exports = 特殊怪;