import IPreSetting from './ipre';
interface IMapSetting {
    [mapName: string]: {
        teams: {
            [mapName: string]: {
                monsters: {
                    name: string
                    minLevel: number
                    maxLevel: number
                    minCount: number
                    maxCount: number
                }[]
                appear: number
                boss?: boolean
            }
        }
        pre?: IPreSetting
    }
}
const MapSetting: IMapSetting = {
    新手村: {
        teams: {
            史莱姆队: {
                monsters: [
                    {
                        name: "史莱姆",
                        minLevel: 1,
                        maxLevel: 3,
                        minCount: 1,
                        maxCount: 4
                    },
                    {
                        name: "金属史莱姆",
                        minLevel: 1,
                        maxLevel: 3,
                        minCount: 1,
                        maxCount: 1
                    }
                ],
                appear: 10
            },
            Boss队:{
                monsters:[
                    {
                        name:"特殊怪",
                        minLevel:10,
                        maxLevel:10,
                        minCount:1,
                        maxCount:1
                    }
                ],
                appear:1,
            }

        },
        pre: {
            baseProps: {
                lv: 1
            }
        }
    }

}

export default MapSetting;
export { IMapSetting };