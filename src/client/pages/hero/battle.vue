<template>
    <div class="battle-view container">
        <h2 style="text-indent:10px;">battle <a href="" class="btn" @click.prevent="toggleBattle">{{isBattle?'stop':(isBattling?'stopping':'start')}}</a></h2>
        <small class="text-muted" v-if="wait>0">wait {{wait}}</small>
        <div class="teams">
            <div class="team" v-for="team in [A,B]">
                <div class="character" v-for="c in team">
                    <h5 class="text-muted"> {{c.name}} <br> <small>lv.{{c.baseProps.lv}}</small> <small>{{c.job && c.job.name}}</small></h5>
                    <div class="progress">
                        <div class="progress-bar bg-success" :style="{width: c.battleProps.hp/c.battleProps.maxhp*100 +'%'}"></div>
                    </div>
                    <div class="progress" style="margin-bottom:0;">
                        <div class="progress-bar bg-info" :style="{width: c.battleProps.mp/c.battleProps.maxmp*100 +'%'}"></div>
                    </div>
                    <div class="buffs">
                        <span class="badge badge-default" v-for="b in c.buffs">{{b.name}}</span>
                    </div>
                    <div class="battle-info">
                        <div :class="c.battleInfo && c.battleInfo.skill && c.battleInfo.skill.name" class="skill">
                            <span class="skill-name" v-if="c.battleInfo && c.battleInfo.skill ">{{c.battleInfo.skill.name}}</span>
                        </div>
                        <div class="change" :class="c.battleInfo && c.battleInfo.dskill && c.battleInfo.dskill.name">
                            <div class="change-values" v-if="c.battleInfo">
                                <span class="change-value" :class="[key,{up:value>0,down:value<0}]" v-if="value" v-for="(value,key) in c.battleInfo.c">{{/hp$/.test(key)?value:key}}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="result" v-if="resultInfo">
            <div class="container">
                <h3 v-if="resultInfo.endReason=='DefenderDie'">胜利</h3>
                <h3 v-if="resultInfo.endReason=='AttackerDie'">失败</h3>
                <h3 v-if="resultInfo.endReason=='AllDie'">打平</h3>
                <h3 v-if="resultInfo.endReason=='TimeOut'">超时</h3>
                <hr>
                <p>获得:{{resultInfo.dropExp}}exp</p>
                <p v-if="resultInfo.dropEquits && resultInfo.dropEquits.length">掉落: <span v-for="equit in  resultInfo.dropEquits">{{equit.name}} lv.{{equit.lv}}</span></p>
                <p v-if="resultInfo.dropItems && resultInfo.dropItems.length">掉落: <span v-for="item in  resultInfo.dropItems">{{item.name}} lv.{{item.lv}}</span></p>
                <small>耗时:{{resultInfo.duration}}</small>
            </div>
        </div>

    </div>
</template>
<script src="./battle.js"></script>
<style src="./battle.less" lang="less"></style>