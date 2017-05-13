import Api from 'common/api';
import Vue from 'Vue';
import PopMessage from 'common/pop-message';
export default {
    name: "skill",
    data() {
        return {
            skills: [],
            learnedSkills: [],
            canLearnSkills: [],
        }

    },
    mounted() {
        this.getHeroSkill();
    },
    methods: {
        async setSkill(skill) {
            if (skill.set) {
                return
                //    this.skills =  this.skills.filter(s=>!(s.name==skill.name&&s.lv==skill.lv));
            }
            else {
                this.skills.push({ name: skill.name, lv: skill.lv })
            }
            await this.useSkills();
        },
        async unsetSkill(skill) {
            this.skills = this.skills.filter(s => !(s.name == skill.name && s.lv == skill.lv));
            await this.useSkills();
        },

        async useSkills() {
            if (!this.skills.length) {
                PopMessage("请至少一个技能");
            }
            else {
                var skillsMap = {};
                this.skills.forEach(skill => {
                    if (skillsMap[skill.name] && skillsMap[skill.name] > skill.lv) {

                    }
                    else {
                        skillsMap[skill.name] = skill.lv;
                    }
                })

                var skillStr = Object.keys(skillsMap).map(key => key + "-" + skillsMap[key]).join(",");
                var result = await Api.Hero.useSkills({ skills: skillStr });
            }

            await this.getHeroSkill();
        },
        async learnSkill(skill) {
            var result = await Api.Hero.learnSkill({ skill: skill.name, lv: skill.lv })
            await this.getHeroSkill();
        },
        async getHeroSkill() {
            var result = await Api.Hero.select();
            result = result.result;
            this.learnedSkills = result.learnedSkills;
            this.canLearnSkills = result.canLearnSkills;
            this.skills = result.skills;

            this.learnedSkills.forEach(skill => {
                if (this.skills.find(s => s.name == skill.name && s.lv == skill.lv)) {
                    //Vue.set(skill,'set',true);

                    skill.set = true;
                }
            })

        }
    }

}