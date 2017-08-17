import Vue from 'vue';

const Filters = {
    img(value, domain) {
        if (!/http/.test(value)) {
            value = domain + value;
        }
        return value;
    },
    date(value, fmt) {
        value = new Date(value);
        var o = {
            "M+": value.getMonth() + 1, //月份 
            "d+": value.getDate(), //日 
            "h+": value.getHours(), //小时 
            "m+": value.getMinutes(), //分 
            "s+": value.getSeconds(), //秒 
            "q+": Math.floor((value.getMonth() + 3) / 3), //季度 
            "S": value.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (value.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    differNow(value){
        var differDate = new Date(value);
        var nowDate = new Date();
        return `${((nowDate-differDate)/1000/3600/24).toFixed(0)} days ${((nowDate-differDate)/1000/3600%24).toFixed(0)} hrs ${((nowDate-differDate)/1000/60%60).toFixed(0)} mins`
    }

}

for (let i in Filters) {
    Vue.filter(i, Filters[i]);
}
export default Filters;