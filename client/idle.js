{
    window.vm = new Vue({
        el: '.app',
        data() {
            return {
                msg: "",
                attacker: null,
                defender: null,

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
                        break;
                    }
                    await this.fight();
                    //this.isAutoFight = false;
                }
            },
            async fight() {
                this.roundInfos = [];
                this.resultInfo = null;
                this.defender = null;
                this.isFighting = true;
                var result = (await Api.Hero.fight()).result;

                if (typeof result != "object") {
                    var nextActionTime = new Date(result);
                    var now = new Date();
                    var waitTime = Math.ceil((nextActionTime - now) / 1000);
                    await this.countDown(waitTime)

                }
                else {
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

}
