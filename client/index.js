{
    var vm = new Vue({
        el: '.app',
        async mounted() {
            console.info(Api)
            var result = await Api.user.list();
            console.info(result);
        }
    })

}
