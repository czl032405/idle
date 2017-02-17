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
            
            levelup:0,
            maxexp:0,


            battleDelay:1000,//每次战斗的时间间隔

        }
        Object.assign(this, defaultParam, o);

    }

}


module.exports = ResultInfo