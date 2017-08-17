import IPreSetting from './ipre';
interface ISkillSetting {
    [name: string]: {
        [lv: number]: {
            cost?: number,
            pre?: IPreSetting
        }
    }
}
const SkillSetting: ISkillSetting = {
    直接攻击: {
        1: {
            cost: 0,
            pre: {}
        },
        2: {
            cost: 1,
        }
    },

}

export default SkillSetting
export { ISkillSetting };