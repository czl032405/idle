{
    window.vm = new Vue({
        el: '.app',
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
            async learnSkill(skill) {
                if (confirm(`确认学习${skill.name}lv.${skill.lv}吗?`)) {
                    var result = await Api.Hero.learnSkill(skill.name, skill.lv);
                    location.reload();
                }
            }
        }

    });
}