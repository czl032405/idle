import Api from 'common/api';
import Time from 'common/time';
import Setting from 'common/setting';
import Vue from 'vue';
export default {
    name: "battle",
    data() {
        return {
            isBattle: false,
            isBattling: false,

            A: [],
            B: [],
            resultInfo: null,
            wait: 0,

            expSetting: {},

            test: [],
        }
    },
    async mounted() {


        this.expSetting = await Setting.getExpSetting();
                console.info(this.expSetting)
        this.battle();
    },
    methods: {
        async battle() {
            while (this.isBattle && !this.isBattling) {
                this.isBattling = true;
                var result = await Api.Hero.fight();
                result = result.result;
                if (typeof result == 'object') {
                    this.A = result.A;
                    this.B = result.B;
                    for (let i = 0; i < result.roundInfos.length; i++) {
                        this.A.forEach(c => Vue.set(c, "battleInfo", null));
                        this.B.forEach(c => Vue.set(c, "battleInfo", null));

                        console.info(`round ${i}`)
                        var roundInfo = result.roundInfos[i];
                        await Time.wait(roundInfo.delay);
                        var attacker = this.A.concat(this.B).find(character => character.index == roundInfo.attacker.index);
                        Vue.set(attacker, "battleInfo", { skill: roundInfo.skill })
                        await Time.wait(roundInfo.aniDelay - 900);
                        roundInfo.rbs.forEach((rb, index) => {
                            if (!attacker.battleInfo.c) {
                                attacker.battleInfo.c = attacker.battleInfo.c || rb.ac;
                            }
                            else {
                                Object.keys(attacker.battleInfo.c).forEach(key => {
                                    attacker.battleInfo.c[key] += rb.ac[key];
                                });
                            }
                            Object.assign(attacker, roundInfo.attacker);

                            var defender = this.A.concat(this.B).find(character => character.index == roundInfo.defenders[index].index);
                            Vue.set(defender, "battleInfo", { c: rb.dc, dskill: roundInfo.skill })
                            Object.assign(defender.battleInfo, rb);
                            Object.assign(defender, roundInfo.defenders[index]);
                        })
                        await Time.wait(900);
                    }
                    console.info('round end');
                    this.resultInfo = result.resultInfo
                    this.wait = Math.ceil(result.resultInfo.battleDelay / 1000);
                    while (this.wait > 0) {
                        this.wait--;
                        await Time.wait(1000);
                    }
                    this.resultInfo = null;
                    this.isBattling = false;

                }
                else {
                    this.wait = Math.ceil((new Date(result) - new Date()) / 1000);

                    while (this.wait > 0) {
                        this.wait--;
                        await Time.wait(1000);
                    }
                    this.isBattling = false;
                    console.info(`wait ${this.wait}`)
                }



            }
        },
        toggleBattle() {
            this.isBattle = !this.isBattle;
            this.battle();
        },

    }
}