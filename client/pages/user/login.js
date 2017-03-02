
    var doc = document.currentScript.ownerDocument;
    Vue.component('page-user-login', {
        template: doc.querySelector("template").innerHTML,
        data() {
            return {
                name: "",
                pw: "",
                msg: "",
            }
        },
        async mounted() {

        },
        methods: {
            async login() {
                var result = await Api.User.login(this.name, this.pw);
                if (result.status) {
                    location.href = "index.html";
                }

            }
        }
    })


