import IPreSetting from './ipre';
type IEquitType = "剑" |"棍"| "未知";

interface IEquitSetting {
    [name: string]: {
        type: IEquitType
        pre: IPreSetting
    }
}

const EquitSetting: IEquitSetting = {
    木剑: {
        type: "剑",
        pre: {
            baseProps: {
                lv: 1
            },
            jobs: [
                {
                    name: 'a'
                }
            ]
        }
    }

}

export { IEquitSetting,IEquitType }
export default EquitSetting;

