{
    window.vm = new Vue({
        el: '.app',
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

}
