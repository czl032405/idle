import IPreSetting from './ipre';
interface IMapSetting {
    [mapName: string]: {
        teams: {
            name: string
            monsters: {
                name: string
                minLevel: number
                maxLevel: number
                minCount: number
                maxCount: number
            }[]
            appear: number
            boss?: boolean
            pre?: IPreSetting
        }[]
        pre?: IPreSetting
    }

}
const MapSetting: IMapSetting = {
    新手村: {
        teams: [
            {
                name: "史莱姆队",
                monsters: [
                    {
                        name: "史莱姆",
                        minLevel: 1,
                        maxLevel: 1,
                        minCount: 1,
                        maxCount: 5
                    },

                ],
                appear: 100
            },
            {
                name: " 史莱姆队2",
                monsters: [
                    {
                        name: "史莱姆",
                        minLevel: 3,
                        maxLevel: 5,
                        minCount: 1,
                        maxCount: 3
                    },
                    {
                        name: "金属史莱姆",
                        minLevel: 2,
                        maxLevel: 3,
                        minCount: 1,
                        maxCount: 2
                    },
                ],
                pre: {
                    baseProps: {
                        lv: 4
                    }
                },
                appear: 50
            },
            {
                name: "Boss队",
                monsters: [
                    {
                        name: "测试怪",
                        minLevel: 10,
                        maxLevel: 10,
                        minCount: 1,
                        maxCount: 1
                    }
                ],
                appear: 1,
            }

        ],
        pre: {
            baseProps: {
                lv: 1
            }
        }
    }

}

export default MapSetting;
export { IMapSetting };