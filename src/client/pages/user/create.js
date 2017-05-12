import Api from 'common/api';
import PopMessage from 'common/pop-message';
export default {
    name:"create",
    
    data(){
        return {
            name:"",
            pw:"",
            pwAg:""

        }
    },
    mounted(){
        
    },
    methods:{
        async create(){
            if(this.pw!=this.pwAg){
                PopMessage("2次密码不一致");
                return ;
            }
            var result = await Api.User.create({name:this.name,pw:this.pw});
            this.$router.push("/user/login");  
            PopMessage("create success");          
        }
    }
}