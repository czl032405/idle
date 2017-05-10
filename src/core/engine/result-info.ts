import Character from './character/character';
import EndReason from './end-reason';

class ResultInfo {

    endReason: EndReason = "None";
    duration: number = 0
    battleDelay: number = 1000//每次战斗的时间间隔
    dropEquits: { name: string, lv: number }[] = []
    dropItems: { name: string, count: number }[] = []
    dropExp: number = 0
    A:Character[]
    B:Character[]


}


export default ResultInfo