interface IMonsterSetting {
    [name: string]: {
        props: {
            exp: string | number
            str: string | number
            int: string | number
            agi: string | number
            vit: string | number
            dex: string | number
            luk: string | number
        }
        skills?: { name: string, lv: number }[]
        equits?: { name: string, lv: number }[]
        drops?: { name: string,lv:number, percent: number }[]
    }
}
const MonsterSetting: IMonsterSetting = {
    史莱姆: {
        props: {
            exp: "100*lv",
            str: "1*lv",
            int: 1,
            agi: 1,
            vit: 1,
            dex: 1,
            luk: 1
        }
     
    },
    金属史莱姆: {
        props: {
            exp: "1*lv",
            str: "2*lv",
            int: 1,
            agi: 1,
            vit: "3*lv",
            dex: 1,
            luk: 1
        },

        equits: [
            { name: '木棍', lv: 1 }
        ],
        drops: [
            { name: "木棍",lv:1, percent: 0.1 }
        ]


    }
}
export default MonsterSetting;
export {IMonsterSetting}