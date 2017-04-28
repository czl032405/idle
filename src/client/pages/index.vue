<template>
    <div class="index-view">
        index {{env}}
    </div>
</template>
<script>
    import env from 'env';
    export default {
        name: "index",
        data() {
            return {
                env
            }
        }
    }

</script>