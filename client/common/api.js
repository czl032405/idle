var PopMessage = console.error;
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
            if (/not login/i.test(data.msg)) {
                Api.go2login();
            }
            if (!data.status != 1) {
                data.msg && PopMessage(`${data.msg}`);
                return data;
            }
            return data;

        })
    },
    go2login() {
        //location.href="login.html";
    },
    user: {
        get(id) {
            return Api.getJson('user/get', { id });
        },
        create(name, pw) {
            return Api.getJson('user/create', { name, pw });
        },
        login(name, pw) {
            return Api.getJson('user/login', { name, pw });
        },
    },
    hero: {
        create(name) {
            return Api.getJson('hero/create', { name })
        },
        select(id) {
            return Api.getJson('hero/select', { id })
        },
        changeJob(job) {
            return Api.getJson('hero/changeJob', { job })
        },
        useSkills(skills) {
            return Api.getJson('hero/useSkills', { skills })
        },
        useEquits(equits) {
            return Api.getJson('hero/useEquits', { equits })
        },
        learnJob(job) {
            return Api.getJson('hero/learnJob', { job })
        },
        learnSkill(skill, lv) {
            return Api.getJson('hero/learnSkill', { skill, lv });
        },
        fight() {
            return Api.getJson('hero/fight')
        }
    }

}