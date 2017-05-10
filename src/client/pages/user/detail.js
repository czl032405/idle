import Api from 'common/api';
export default {
    name: "user",
    data() {
        return {
            user: {},
            heros: []
        }
    },
    async mounted() {
            await this.getUser();
    },
    async activated() {
    
        await this.getHeros();
    },
    methods: {
        async getUser() {
            var result = await Api.User.get();
            this.user = result.result;
        },
        async getHeros() {
            var result = await Api.Hero.myList();
            this.heros = result.result;

        },
        async deleteHero(id) {
            if (confirm("确认删除?")) {
                var result = await Api.Hero.del({ id });
                this.heros = this.heros.filter(hero => hero._id != id);
            }
        }
    }
}