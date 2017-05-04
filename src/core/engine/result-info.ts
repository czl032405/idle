import EndReason from './end-reason';

class ResultInfo {
    duration: number = 0
    endReason: EndReason = "None";
    dropEquits: { name: string, lv: number }[] = []
    dropItems: { name: string, count: number }[] = []
    dropExp: number = 0
    battleDelay: number = 1000//每次战斗的时间间隔

}


export default ResultInfo