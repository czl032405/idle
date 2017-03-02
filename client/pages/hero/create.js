
    var doc = document.currentScript.ownerDocument;
    Vue.component('page-hero-create', {
         template: doc.querySelector("template").innerHTML,
        data() {
            return {
                name: "",
                msg: ""
            }
        },
        async mounted() {
            // this.user = (await Api.User.get()).result;
        },
        methods: {
            async createHero() {
                var result = (await Api.Hero.create(this.name)).result;
                location.href = "index.html";
            }
        }
    })


