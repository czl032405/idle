{
    var vm = new Vue({
        el: '.app',
        data(){
            return {
                name:"",
                msg:""
            }
        },
        async mounted() {
            // this.user = (await Api.User.get()).result;
        },
        methods:{
            async createHero(){
                var result = (await Api.Hero.create(this.name)).result;
                location.href="index.html";
            }
        }
    })

}
