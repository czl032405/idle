const Buff = require('./buff.js');

class 魔法基础加成 extends Buff {
    constructor(lv) {
        super( lv);

    }

    apply(origin, receiver) {
        super.apply(origin, receiver)
        origin.battleProps.int *= 1.1;
    }

}