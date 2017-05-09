import Vue from 'vue';
import PopMessage from 'common/pop-message';
const Api = {
    test: "7",
    serverPath: "/api",
    getJson(url, param, type = "get", dataType = "json") {
        dataType == "jsonp" && (type = "jsonp");
        if (!/http/i.test(url)) url = this.serverPath + url;
        return Vue.http[type](url, type == "post" ? param : {
            params: param,
        }, type == "post" && { emulateJSON: true }).then((data) => {
            return data.json();
        }, (e) => {
            !/^(200|304|0)$/.test(e.status) && PopMessage(`${url}:${e.status}`);
            !navigator.onLine && PopMessage(`${url}:网络连接失败`);
            console.log(`[ajax error] ${url}:${e.status}`)
            throw e;
        }).then((data) => {
            console.groupCollapsed(`[ajax] ${url}`)
            param && console.log(param)
            data && console.log(data);
            console.groupEnd();
            PopMessage();
            if (/not login/i.test(data.msg)) {
                Api.go2login();
                throw data;
            }
            if (data.status < 1) {
                data.msg && PopMessage(`${data.msg}`);
                throw data;
            }
            return data;

        })
    },
    go2login() {
        console.info("login");
        // router.push('/user/login');
    }


}

const ApiMap = {
    User: {
        get: 'id',
        create: 'name|pw',
        login: 'name|pw'
    },
    Hero: {
        create: 'name',
        del: 'id',
        select: 'id',
        myList: '',
        mapList: '',
        changeJob: 'job',
        useSkills: 'skills',
        useEquits: 'equits',
        learnJob: 'job',
        learnSkill: 'skill|lv',
        fight: '',
    },
    setting:{
        exp:'',
        idle:'',
        map:'',
    }


}


Object.keys(ApiMap).forEach(key1 => {
    Object.keys(ApiMap[key1]).forEach(key2 => {
        Api[key1] || (Api[key1] = {})
        Api[key1][key2] || (Api[key1][key2] = {})
        Api[key1][key2] = Api.getJson.bind(Api, `/${key1}/${key2}`);
        ApiMap[key1][key2] = ApiMap[key1][key2].split('|').map(key => {
            if (key) {
                return { name: key, value: "" }
            }
            else{
                return null;
            }
        }).filter(p=>p);
    })
})



export default Api;
export { ApiMap }