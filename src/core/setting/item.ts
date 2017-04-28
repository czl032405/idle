import IPreSetting from './ipre';
interface IItemSetting{
    [name:string]:{
        pre:IPreSetting
    }
}
const ItemSetting:IItemSetting= {
    升级药: {
        pre: {
          
        }
    }

}

export default ItemSetting ;
export {IItemSetting};