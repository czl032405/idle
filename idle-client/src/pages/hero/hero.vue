<template>
    <div class="hero-view" style="position:relative;">
        <hero-nav></hero-nav>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import Nav from './nav.vue';
    export default {
        name :"hero",
        components:{
            'hero-nav':Nav,
        }
    }
</script>