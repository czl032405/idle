import {IEquitType} from './equit';
interface IPreSetting {
    jobs?: {
        name: string
    }[]
    skills?: {
        name: string
        lv: number
    }[]
    equit?: IEquitType
    baseProps?: {
        lv?: number
        exp?: number
        maxexp?: number
        str?: number
        int?: number
        agi?: number
        vit?: number
        dex?: number
        luk?: number
    }

}

export default IPreSetting;