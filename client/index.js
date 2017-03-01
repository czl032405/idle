{
    var router = new VueRouter({
        mode: "hash",
        routes: [
            { path: "/index", component: Vue.component('page-index') },
            {
                path: "/hero", component: Vue.component('page-hero'),
                children: [
                    { path: "", redirect: "battle" },
                    { path: "battle", component: Vue.component('page-hero-battle') },
                    { path: "create", component: Vue.component('page-hero-create') },
                    { path: "equit", component: Vue.component('page-hero-equit') },
                    { path: "item", component: Vue.component('page-hero-item') },
                    { path: "job", component: Vue.component('page-hero-job') },
                    { path: "map", component: Vue.component('page-hero-map') },
                    { path: "skill", component: Vue.component('page-hero-skill') },
                ]
            },
            {
                path: "/user", component: Vue.component('page-user'),
                children: [
                    { path: "", redirect: 'detail' },
                    { path: "detail", component: Vue.component('page-user-detail') },
                    { path: "login", component: Vue.component('page-user-login') },
                    { path: "register", component: Vue.component('page-user-register') }
                ]
            },
            { path: "*", redirect: '/user' },
        ]
    })

    // Vue.config.errorHandler = function (err, vm) {
    //     console.error(err);
    //     console.error(vm)
    // }

    


    var vm = new Vue({
        el: '.app',
        router,
        data() {
            return {
                msg: "",
            }
        },
        async mounted() {

        },
        methods: {

        }
    })

}
