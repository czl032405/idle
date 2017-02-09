const EndReason = require('./end-reason');
class ResultInfo {
    constructor(o) {
        var defaultParam = {
            winner: "",
            loser: "",
            duration: 0,
            endReason:EndReason.None,
            
            
            dropEquits: [],//{name,lv}
            dropItems: [],//{name,count}
            dropExp:0,

        }
        Object.assign(this, defaultParam, o);

    }

}


module.exports = ResultInfo