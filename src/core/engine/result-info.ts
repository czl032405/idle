import EndReason from './end-reason';

class ResultInfo {
    winner: string = ""
    loser: string = ""
    duration: number = 0
    endReason: EndReason = EndReason.None;
    dropEquits: { name: string, lv: number }[] = []
    dropItems: { name: string, count: number }[] = []
    dropExp: number = 0
    levelup: number = 0
    maxexp: number = 0
    battleDelay: number = 1000//每次战斗的时间间隔

}


export default ResultInfo