import Api from 'common/api';
export default {
    name :"create",
    data(){
        return {
            name:"",
        }
    },
    mounted(){

    },
    methods:{
        async  createHero(){
            var result = await Api.Hero.create({name:this.name})
            this.$router.push("/user/detail");
        }
    }
}