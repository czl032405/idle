{
    window.vm = new Vue({
        el: '.app',
        data() {
            return {
                msg: "",
                maps: [],
                hero: {},
            }
        },
        mounted() {
            this.getMaps();
            this.getHero();
        },
        methods: {
            async getHero() {
                var result = (await Api.Hero.select()).result;
                this.hero = result;
            },
            async getMaps() {
                var result = (await Api.Hero.mapList()).result;
                this.maps = result;
            },
            async changeMap(map) {
                var result = await Api.Hero.changeMap(map.name);
                location.reload();
            }
        }
    });
}