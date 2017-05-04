import BaseProps from '../../base-props';
import Monster from './monster';
class 特殊怪 extends Monster {
    constructor(lv?:number) {
        lv = lv || 1;
        var str = 99 * lv;
        var int = 99 * lv;
        var agi = 99 * lv;
        var vit = 99 * lv;
        var dex = 99 * lv;
        var luk = 99 * lv;
        super("特殊怪", Object.assign(new BaseProps(), { lv, str, int, agi, vit, dex, luk }));

    }
}
export default 特殊怪;
