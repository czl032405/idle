<template>
    <div class="battle-view container">
        <h2 style="text-indent:10px;">battle <a href="" class="btn" @click.prevent="toggleBattle">{{isBattle?'stop':(isBattling?'stopping':'start')}}</a></h2>
        <div class="teams">
            <div class="team" v-for="team in [A,B]" v-if="team.length">
                <div class="character" :class="{die:c.battleProps.hp<=0}" v-for="c in team">
                    <div class="text-muted info">
                        <span>{{c.name}}</span>
                        <br>
                        <small>lv.{{c.baseProps.lv}}</small>
                        <small>{{c.job && c.job.name}}</small>
                        <br>
                    </div>
                    <div class="progresss">
                        <div class="progress">
                            <span>{{c.battleProps.hp}}/{{c.battleProps.maxhp}}</span>
                            <div class="progress-bar bg-success" :style="{width: c.battleProps.hp/c.battleProps.maxhp*100 +'%'}"></div>
                        </div>
                        <div class="progress" v-if="c.battleProps.maxmp>0">
                            <span>{{c.battleProps.mp}}/{{c.battleProps.maxmp}}</span>
                            <div class="progress-bar bg-info" :style="{width: c.battleProps.mp/c.battleProps.maxmp*100 +'%'}"></div>
                        </div>
                        <div class="progress" v-if="team == A">
                            <span>{{ c.baseProps.exp}}/{{expSetting[c.baseProps.lv]}}</span>
                            <div class="progress-bar bg-warning" :style="{width: c.baseProps.exp/expSetting[c.baseProps.lv]*100 +'%'}"></div>
                        </div>
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
                <p class="text-muted">耗时:{{resultInfo.duration}}</p>
                <p class="text-muted" v-if="wait>0">wait:{{wait}}</p>
            </div>
        </div>

    </div>
</template>
<script src="./battle.js"></script>
<style src="./battle.less" lang="less"></style>