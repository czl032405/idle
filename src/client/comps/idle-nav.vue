<template>
    <div class="nav">
        <div class="nav-con">
            <h2>idle</h2>
            <div class="nav-items">
                <a href="" :class="{on:selected==item}" v-for="item in ['hero','user','setting']" @click.prevent="open=selected!=item?true:!open;selected=item;">{{item}}</a>
            </div>
        </div>
        <div class="nav-item" v-show="selected == 'hero' && open">
            <a :class="{on:subSelected==item}" class="nav-sub-item" v-for="item in ['create','battle','job','skill','equit','item']"
                @click="nav(item)">{{item}}</a>

        </div>
        <div class="nav-item" v-show="selected == 'user' && open">
            <a :class="{on:subSelected==item}" class="nav-sub-item" v-for="item in ['login','create']" @click="nav(item)">{{item}}</a>
        </div>
        <div class="nav-item" v-show="selected == 'setting' && open">
           <a :class="{on:subSelected==item}" class="nav-sub-item" v-for="item in ['none']" @click="nav(item)">{{item}}</a>
        </div>
        <div class="shadow" v-show="open" @click="open= false"></div>
    </div>

</template>
<script src="./idle-nav.js"></script>
<style src="./idle-nav.less" lang="less"></style>