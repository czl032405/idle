import IPreSetting from './ipre';
interface IJobSetting {
    [name: string]: {
        levelup: {
            baseProps: {
                str?: number
                int?: number
                agi?: number
                vit?: number
                dex?: number
                luk?: number
            }

        }
        pre?: IPreSetting
    }
}


const JobSetting: IJobSetting = {
    初心者: {
        levelup: {
            baseProps: {
                str: 5,
                int: 1,
                agi: 5,
                vit: 5,
                dex: 5,
                luk: 1
            }
        }
    },
    战士: {
        levelup: {
            baseProps: {
                str: 2,
                int: 1,
                agi: 1,
                vit: 2,
                dex: 1,
                luk: 1
            }
        },
    }
}
export default JobSetting;
export { IJobSetting }