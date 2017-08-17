
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './pages/app.vue';
import VueFilters from 'common/vue-filters';
import env from 'env';
import Resource from 'common/resource';
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/index', component: require('./pages/index.vue') },
        { path: '/user/create', component: require('./pages/user/create.vue') },
        { path: '/user/login', component: require('./pages/user/login.vue') },
        { path: '/user/detail', component: require('./pages/user/detail.vue') },
        { path: '/hero/create', component: require('./pages/hero/create.vue') },
        {
            path: '/hero', component: require('./pages/hero/hero.vue'),
            children: [
                { path: '', redirect: 'detail' },
                { path: 'detail', component: require('./pages/hero/detail.vue') },
                { path: 'battle', component: require('./pages/hero/battle.vue') },
                { path: 'job', component: require('./pages/hero/job.vue') },
                { path: 'skill', component: require('./pages/hero/skill.vue') },
                { path: 'equit', component: require('./pages/hero/equit.vue') },
                { path: 'item', component: require('./pages/hero/item.vue') },
                { path: 'map', component: require('./pages/hero/map.vue') },
            ]
        },


        { path: '/api', component: require('./pages/api.vue') },
        { path: '/route', component: require('./pages/route.vue') },
        { path: "*", redirect: /dev/.test(env) ? '/route' : '/index' },
    ]
})



router.beforeEach(async function loginFilter(to, from, next) {
    next();
});


if (!/dev/.test(env)) {
    Vue.config.errorHandler = function (err, vm) {
        console.error(err);
        console.error(vm)
    }

}


const store = new Vuex.Store({
    state: {
        count: 0
    },
})

//app
var app = new Vue(Vue.util.extend({ router, store }, App)).$mount('app');
var fullLoading = document.querySelector(".full-loading");
fullLoading && (fullLoading.style.display = "none");

export default app;

