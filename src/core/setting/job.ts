import IPreSetting from './ipre';
interface IJobSetting {
    [name: string]: {
        pre?: IPreSetting
    }
}


const JobSetting: IJobSetting = {
    初心者: {
       
    },
    战士: {
        pre: {
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