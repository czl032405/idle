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
            async register() {
                var result = await Api.User.create(this.name, this.pw);

                location.href = "login.html";


            }
        }
    })

}
