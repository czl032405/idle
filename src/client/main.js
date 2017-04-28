
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './pages/app.vue';
import VueFilters from 'common/vue-filters';
import env from 'env';
import Resource from 'common/resource';
Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/index', component: require('./pages/index.vue')},
          { path: "*", redirect: '/index' },
    ]
})

//全局组件注册
//comps
var comps = Resource.requireAll((require.context("./comps", true, /^\.\/.*\.vue/)))
comps.forEach((comp) => {
    Vue.component(comp.name, comp)
});


router.beforeEach(async function loginFilter(to, from, next) {
    next();
});


if (/dev/.test(env)) {
    Vue.config.errorHandler = function (err, vm) {
        console.error(err);
        console.error(vm)
    }

}

//app
var app = new Vue(Vue.util.extend({ router }, App)).$mount('app');
var fullLoading = document.querySelector(".full-loading");
fullLoading && (fullLoading.style.display = "none");

