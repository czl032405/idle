{
    var vm = new Vue({
        el: '.app',
        data() {
            return {
                msg:"",
                user: null,
                heros:[],
                deleteMode:false,
            }
        },
        async mounted() {
            this.user = (await Api.User.get()).result;
            this.heros = (await Api.Hero.myList()).result;
        },
        methods: {
            async selectHero(id) {
                await Api.Hero.select(id);
                location.href = "idle.html";
            },
            async deleteHero(id){
                await Api.Hero.del(id);
                location.reload();
            }
        }
    })

}
