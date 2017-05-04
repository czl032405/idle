<template>
    <div class="index container">
        <h3>mode:{{env}}</h3>
        <div v-for="page in pages">
            <a :href="'#'+page.path">{{page.path}}</a><br>
            <div v-for="child in page.children" style="padding-left:30px">
                <a :href="'#'+page.path+'/'+child.path">{{"/"+child.path}}</a>
                <div v-for="childchild in child.children" style="padding-left:40px">
                    <a :href="'#'+page.path+'/'+child.path+'/'+childchild.path">{{"/"+childchild.path}}</a>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import env from 'env';
    export default {
        created() {
            this.pages = [];
            console.info(this.pages = this.$router.options.routes);

        },
        data() {
            return {
                env,
                pages: [],
            }
        }
    }

</script>