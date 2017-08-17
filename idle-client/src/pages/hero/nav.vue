<template>
    <div class="hero-nav" :class="{trans:!touch.touching}" :style="{left:x+'px',top:y+'px'}" @touchstart.prevent="touchstart($event)"
        @touchmove.prevent="touchmove($event)" @touchend.prevent="touchend($event)" @mousedown.prevent="touchstart($event)" @mousemove.prevent="touchmove($event)"
        @mouseup.prevent="touchend($event)">
        <span>nav</span>
        <router-link :class="{show:show}" to="/hero/battle">battle</router-link>
        <router-link :class="{show:show}" to="/hero/skill">skill</router-link>
        <router-link :class="{show:show}" to="/hero/job">job</router-link>
        <router-link :class="{show:show2}" to="/hero/map">map</router-link>
        <router-link :class="{show:show2}" to="/hero/equit">equit</router-link>
        <router-link :class="{show:show2}" to="/hero/item">item</router-link>
        <router-link :class="{show:show2}" to="/hero/detail">detail</router-link>

    </div>
</template>
<style src="./nav.less" lang="less"></style>
<script>
    export default {
        data() {
            return {
                x: 10,
                y: 10,
                show: false,
                show2: false,
                touch: {
                    originX: 0,
                    originY: 0,
                    startX: 0,
                    startY: 0,
                    touching: false
                }
            }
        },
        mounted() {
            this.x = document.querySelector(".app").offsetWidth - 60
        },
        methods: {
            touchstart(e) {
                console.info(e)
                var { clientX, clientY } = e.touches ? e.touches[0] : e;
                this.touch.startX = clientX;
                this.touch.startY = clientY;
                this.touch.originX = this.x;
                this.touch.originY = this.y;
                this.touch.touching = true;
            },
            touchmove(e) {
                console.info(233)
                if (this.touch.touching) {
                    var { clientX, clientY } = e.touches ? e.touches[0] : e;
                    this.x = this.touch.originX + clientX - this.touch.startX;
                    this.y = this.touch.originY + clientY - this.touch.startY;
                }


            },
            touchend(e) {
                if (this.x < -30) {
                    this.x = -30;
                }
                if (this.y < -30) {
                    this.y = -30
                }
                if (this.x > document.documentElement.clientWidth - 30) {
                    this.x = document.documentElement.clientWidth - 30
                }
                if (this.y > document.documentElement.clientHeight - 30) {
                    this.y = document.documentElement.clientHeight - 30
                }
                this.touch.touching = false;
                if (Math.abs(this.x - this.touch.originX) < 5 && Math.abs(this.y - this.touch.originY) < 5) {
                    this.toggle(e)
                }
            },

            toggle(e) {
                if (e.target.tagName == 'SPAN') {
                    if (this.show && this.show2) {
                        this.show = false;
                        this.show2 = false;
                    }
                    else if (!this.show2 && this.show) {
                        this.show2 = true
                    }
                    else {
                        this.show = true
                    }
                }
                else {
                    this.show = false;
                    this.show2 = false;
                }

            },

        }
    }

</script>