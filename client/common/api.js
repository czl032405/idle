var PopMessage = console.error;
const HeroSocket = io('/hero');
const Api = {
    serverPath: "/",
    getJson(url, param, type = "get", dataType = "json") {
        dataType == "jsonp" && (type = "jsonp");
        if (!/http/i.test(url)) url = this.serverPath + url;
        return Vue.http[type](url, type == "post" ? param : {
            params: param,
        }, type == "post" && { emulateJSON: true }).then((data) => {
            return data.json();
        }, (e) => {
            !/200|304/.test(e.status) && PopMessage(`${url}:${e.status}`);
            throw e;
        }).then((data) => {
            console.groupCollapsed(`[ajax] ${url}`)
            param && console.log(param)
            data && console.log(data);
            console.groupEnd();
            if (/notLogined/i.test(data.msg)) {
                Api.go2login();
            }
            if (!/succ|1/.test(data.status)) {
                data.msg && PopMessage(`${data.msg}`);
                return data;
            }
            return data;

        })
    },
    go2login() {
        console.info(233)
    },
    user: {
        list() {
            return Api.getJson('user/list');
        },
        get(id) {
            return Api.getJson('user/get', { id });
        },
        create(name, pw) {
            return Api.getJson('user/create', { name, pw });
        },
        login(name, pw) {
            return Api.getJson('user/login', { name, pw });
        },
        ban(name) {
            return Api.getJson('user/ban', { name });
        }
    },
 
}