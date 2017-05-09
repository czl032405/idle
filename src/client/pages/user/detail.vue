<template>
    <div class="user-detail-view container">
        <div class="detail">
            <h2>{{user.name}}</h2>
            <small class="text-muted">age. {{ ((new Date()-new Date(user.creatdDate))/1000/3600/24).toFixed(0)}} days {{((new Date()-new Date(user.creatdDate))/1000/3600%24).toFixed(0)}} hrs {{((new Date()-new Date(user.creatdDate))/1000/60%60).toFixed(0)}} mins</small>
        </div>
        <hr>
        <div class="heros">
            <h4>heros</h4>
            <div class="hero pd-2 pb-2" v-for="hero in heros">
                <div class="left">
                    <h5 class="text-primary">{{hero.name}}</h5>
                    <small>{{hero.job.name}}</small>
                    <small>lv.{{hero.baseProps.lv}}</small>
                    <br>
                    <small class="text-muted">offline for {{ ((new Date()-new Date(hero.lastActionDate))/1000/3600/24).toFixed(0)}} days {{((new Date()-new Date(hero.lastActionDate))/1000/3600%24).toFixed(0)}} hrs {{((new Date()-new Date(hero.lastActionDate))/1000/60%60).toFixed(0)}} mins</small>
                </div>
                <div class="right">
                    <router-link :to="'/hero/battle/'+hero._id" class="btn">go</router-link>
                    <a href="" class="btn text-danger" @click.prevent="deleteHero(hero._id)">delete</a>
                </div>
            </div>
        </div>
        <div class="heros-ctrl mt-2">
            <router-link to="/hero/create" class="btn btn-primary">create Hero</router-link>
        </div>
    </div>
</template>
<script src="./detail.js"></script>
<style src="./detail.less" lang="less"></style>