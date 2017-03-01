{
    var doc = document.currentScript.ownerDocument;
    Vue.component('page-user-detail', {
        template: doc.querySelector("template").innerHTML,
        data() {
            return {
                msg: "",
                user: null,
                heros: [],
                deleteMode: false,
            }
        },
        async mounted() {
            this.user = (await Api.User.get()).result;
            this.heros = (await Api.Hero.myList()).result;
        },
        methods: {
            async selectHero(id) {
                await Api.Hero.select(id);
                // location.href = "idle.html";
                this.$router.push('/hero');
            },
            async deleteHero(id) {
                await Api.Hero.del(id);
                var index = this.heros.findIndex(hero=>hero._id==id);
                this.heros.splice(index,1);
                this.deleteMode=false;
            }
        }
    })

}
