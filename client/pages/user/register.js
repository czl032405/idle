
      var doc = document.currentScript.ownerDocument;
      Vue.component('page-user-register', {
     template: doc.querySelector("template").innerHTML,
        data() {
            return {

                name: "",
                pw: "",
                pwag:"",
            }
        },
        async mounted() {

        },
        methods: {
            async register() {
                if(!this.name||!this.pw){
                    PopMessage("请务必需要username和pw");
                    return;
                }
                if(this.pw!=this.pwag){
                    PopMessage("2次密码不一致");
                    return;
                }
                var result = await Api.User.create(this.name, this.pw);
                location.href = "login.html";


            }
        }
    })


