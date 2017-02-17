
class BaseProps {
    constructor(o) {
        var defaultParam={
            lv:1,
            exp:0,
            maxexp:0,
            str:0,
            int:0,
            agi:0,
            vit:0,
            dex:0,
            luk:0,
        }
        Object.assign(this,defaultParam,o)

    }



}

module.exports = BaseProps;