{
    var vm = new Vue({
        el: '.app',
        data(){
            return {
                user:null
            }
        },
        async mounted() {
            this.user = (await Api.User.get()).result;
        },
        methods:{
            async selectHero(id){
                await Api.Hero.select(id);
                location.href="idle.html";
            }
        }
    })

}
