<template>
    <div class="hero-skill-view">
        <h2>Skill</h2>
        <hr>
        <h5>skills can learn</h5>
        <div class="skills">
            <div class="skill" v-for="skill in canLearnSkills">
                <div>
                    <span>{{skill.name}}</span>
                    <span>lv.{{skill.lv}}</span>
                </div>

                <a href="" class="btn" @click.prevent="learnSkill(skill)">learn</a>
            </div>
        </div>
        <hr>
        <h5>skills learned</h5>
        <div class="skill" v-for="skill in learnedSkills">
            <div>
                <span>{{skill.name}}</span>
                <span>lv.{{skill.lv}}</span>
            </div>

            <a :href="!skill.set" class="btn" @click.prevent="setSkill(skill)">{{skill.set?'setted':'set'}}</a>
        </div>
        <hr>
        <h5>skills equited</h5>
        <div class="skill" v-for="skill in skills">
            <div>
                <span>{{skill.name}}</span>
                <span>lv.{{skill.lv}}</span>
            </div>

            <a href="" class="btn" @click.prevent="unsetSkill(skill)">unset</a>
        </div>
    </div>
</template>
<style src="./skill.less" lang="less"></style>
<script src="./skill.js"></script>