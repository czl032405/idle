import RoundInfo from '../../round-info';
import Buff from './buff';

class TestBuff extends Buff {
    fire(roundInfo: RoundInfo) {
        super.fire(roundInfo);

        roundInfo.rbs.forEach(rb => {
            rb.dc.hp = -1;
        })
        return roundInfo;
    }
}

export default TestBuff;