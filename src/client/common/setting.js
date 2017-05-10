import Api from 'common/api';
var settings = {}
const getSetting = async function (settingName) {
    if (settings[settingName]) {
        return settings[settingName]
    }
    var result = await Api.Setting[settingName]();
    settings[settingName] = result.result;
    return settings[settingName];

}


const getExpSetting = async function () {
    return await getSetting("exp");
}


const getIdleSetting = async function () {
    return await getSetting("idle");
}


const getMapSetting = async function () {
    return await getSetting("map");
}

export default {
    getExpSetting,
    getIdleSetting,
    getMapSetting

}