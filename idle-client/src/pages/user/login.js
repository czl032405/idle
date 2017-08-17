import Api from 'common/api';
import PopMessage from 'common/pop-message';
export default {
    name:"create",
    
    data(){
        return {
            name:"",
            pw:"",

        }
    },
    mounted(){
        
    },
    methods:{
        async login(){
         
            var result = await Api.User.login({name:this.name,pw:this.pw});
            this.$router.push('/user/detail');
            PopMessage("login success");          
        }
    }
}