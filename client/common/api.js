var PopMessage =  function(msg){
    window.vm && (window.vm.msg= msg);
};
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
                return;
            }
            if (data.status <1) {
                data.msg && PopMessage(`${data.msg}`);
                throw data;
            }
            return data;

        })
    },
    go2login() {
        location.href="login.html";
    },
    User: {
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
    Hero: {
        create(name) {
            return Api.getJson('hero/create', { name })
        },
        del(id){
             return Api.getJson('hero/del', { id })
        },
        select(id) {
            return Api.getJson('hero/select', { id })
        },
        myList(){
            return Api.getJson('hero/myList');
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
    },
    Admin:{
        User:{
            list(){
                return Api.getJson("admin/user/list")
            },
            ban(name){
                return Api.getJson("admin/user/ban",{name})
            }
        },
        Hero:{
            list(){
                return Api.getJson("admin/hero/list")
            }
        }
    }

}