{
    var doc = document.currentScript.ownerDocument;
    Vue.component('page-hero-equit', {
        template: doc.querySelector("template").innerHTML,
        data() {
            return {
                msg: "",
                hero: {},
            }
        },
        async mounted() {
            await this.getHero();
        },
        methods: {
            async getHero() {
                var result = (await Api.Hero.select()).result;
                this.hero = result;
            },
            async addEquit(equit) {
                if (this.hero.equits.length < 4) {
                    this.hero.equits.push(equit);
                    var equits = this.hero.equits.map((equit) => {
                        return equit._id;
                    }).join(",")
                    var result = await Api.Hero.useEquits(equits);
                    location.reload();
                }
                else {
                    this.msg = "xxxx";
                }


            },
            async removeEquit(equit) {
                var index = this.hero.equits.findIndex((ele) => {
                    return ele._id == equit._id;
                })
                this.hero.equits.splice(index, 1);
                var equits = this.hero.equits.map((equit) => {
                    return equit._id;
                }).join(",")
                var result = await Api.Hero.useEquits(equits);
                location.reload();
            }
        }

    });
}