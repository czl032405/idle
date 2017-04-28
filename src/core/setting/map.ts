import IPreSetting from './ipre';
interface IMapSetting  {
    [name:string]:{
        monsters:{
            [name:string]:{
                minLevel:number
                maxLevel:number
                appear:number
                boss?:boolean
            }
        }
        pre?:IPreSetting
    }
}
const MapSetting:IMapSetting={
    新手村: {
        monsters: {
            史莱姆: {
                minLevel: 1,
                maxLevel: 3,
                appear: 50
            },
            金属史莱姆: {
                minLevel: 1,
                maxLevel: 3,
                appear: 10
            },
            特殊怪: {
                minLevel: 10,
                maxLevel: 10,
                appear: 1,
                boss:true
            }
            
        },
        pre:{
            baseProps:{
                lv:1
            }
        }
    }
   
}

export default MapSetting;
export {IMapSetting};