const EndReason = require('./end-reason');
class ResultInfo {
    constructor(o) {
        var defaultParam = {
            winner: null,
            loser: null,
            duration: 0,
            endReason:EndReason.None,
            
            
            dropEquits: [],
            dropItems: [],
            dropExp:0,
            isLevelUp:false

        }
        Object.assign(this, defaultParam, o);

    }

}


module.exports = ResultInfo