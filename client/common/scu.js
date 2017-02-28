{
    var p = document.currentScript.ownerDocument.querySelector("template").innerHTML
    Vue.http.headers.common['Authorization'] = '233';
    Vue.http.interceptors.push((request, next) => {
        request.params = request.params || {};
        request.params._ = md5(eval(p));
        next();
    });
}

