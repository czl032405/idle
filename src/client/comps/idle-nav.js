export default {
    name: "idle-nav",
    data() {
        return {
            selected: "",
            subSelected: "",
            open: false
        }
    },
    mounted() {
        console.info(this.$route)
        var path = this.$route.path;
        var ps = path.split("/");
        this.selected = ps[1];
        this.subSelected = ps[2];

    },
    methods: {
        nav(item) {
            this.subSelected = item;
            this.open = false;
            this.$router.push(`/${this.selected}/${item}`);

        }
    }
}