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
            async learnJob(job) {
                if (confirm(`确认学习${job.name}吗?`)) {
                    var result = await Api.Hero.learnJob(job.name);
                    location.reload();
                }
            },
            async changeJob(job) {
                if (confirm(`确认转职${job.name}吗?`)) {
                    var result = await Api.Hero.changeJob(job.name);
                    location.reload();
                }
            }
        }

    });
}