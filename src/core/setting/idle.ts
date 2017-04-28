interface IIdleSetting {
    name: string,
    expMult: number
    equitMult: number,
    maxHero: number,
    dburl2: string,
    dburl: string

}

const IdleSetting: IIdleSetting = {
    name: '1',
    expMult: 1,
    equitMult: 1,
    maxHero: 4,
    dburl2: "mongodb://localhost:27017/eggg",
    dburl: "mongodb://2333"
}
export default IdleSetting;