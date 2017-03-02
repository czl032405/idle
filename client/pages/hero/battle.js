var doc = document.currentScript.ownerDocument;
Vue.component('page-hero-battle', {
    template: doc.querySelector("template").innerHTML,
    data() {
        return {
            msg: "",
            attacker: {},
            defender: {},

            roundInfos: [],
            resultInfo: null,
            isAutoFight: false,
            isFighting: false,
            countDownSecond: -1
        }
    },
    async mounted() {
        this.attacker = (await Api.Hero.select()).result;
    },
    methods: {
        async autoFight() {
            this.isAutoFight = !this.isAutoFight;
            while (this.isAutoFight) {
                if (this.isFighting) {
                    log("[fight] isFighting break");
                    break;
                }
                await this.fight();
            }
        },
        async fight() {
            this.roundInfos = [];
            this.resultInfo = null;
            this.defender = {};
            this.isFighting = true;
            var result = null;
            try {
                result = (await Api.Hero.fight()).result;
                if (typeof result != "object") { //等待
                    var nextActionTime = new Date(result);
                    var now = new Date();
                    var waitTime = Math.ceil((nextActionTime - now) / 1000);
                    throw waitTime;

                }
                else { //处理对战结果
                    this.attacker = result.A;
                    this.defender = result.B;
                    for (let i in result.roundInfos) {
                        var roundInfo = result.roundInfos[i];
                        await this.wait(roundInfo.delay);
                        roundInfo.a.hasValue = false;
                        for (let a in roundInfo.a) {
                            if (roundInfo.a[a]) {
                                roundInfo.a.hasValue = true;
                                break;
                            }

                        }
                        roundInfo.d.hasValue = false;
                        for (let d in roundInfo.d) {
                            if (roundInfo.d[d]) {
                                roundInfo.d.hasValue = true;
                                break;
                            }

                        }
                        this.roundInfos.unshift(roundInfo);
                        await this.wait(roundInfo.aniDelay);
                        this.attacker = roundInfo.attacker.name == this.attacker.name ? roundInfo.attacker : roundInfo.defender;
                        this.defender = roundInfo.defender.name == this.defender.name ? roundInfo.defender : roundInfo.attacker;

                    }

                    await this.wait(1000);
                    this.resultInfo = result.resultInfo;
                    this.attacker.baseProps.exp += result.resultInfo.dropExp;
                    this.attacker.baseProps.lv += result.resultInfo.levelup;
                    this.attacker.baseProps.maxexp = result.resultInfo.maxexp;
                    await this.countDown(Math.ceil(result.resultInfo.battleDelay / 1000));
                }
            }
            catch (e) {
                e.message && log(e.message);
                var waitTime = typeof e == "object" ? 20 : e;
                await this.countDown(parseInt(waitTime));
            }
            this.isFighting = false;
        },
        async countDown(waitTime) {
            this.countDownSecond = waitTime;
            while (this.countDownSecond >= 0) {
                await this.wait(1000);
                this.countDownSecond--;
            }
        },
        async wait(timeout) {
            timeout = timeout || 1000;
            return new Promise((resolve) => {
                setTimeout(function () {
                    resolve();
                }, timeout);
            })
        }
    }
})


