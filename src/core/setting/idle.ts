interface IIdleSetting {
    name: string,
    expMult: number
    equitMult: number, 
    maxHero: number,  //最大角色数
    maxBattleMonster:number, //最大对战宠物数量
    dburl2: string,
    dburl: string

}

const IdleSetting: IIdleSetting = {
    name: 'idle',
    expMult: 1,
    equitMult: 1,
    maxHero: 4,
    maxBattleMonster:3,
    dburl2: "mongodb://localhost:27017/eggg",
    dburl: "mongodb://2333"
}
export default IdleSetting;