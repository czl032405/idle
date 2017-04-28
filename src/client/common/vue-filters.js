import Vue from 'vue';

const Filters = {
    img(value, domain) {
        if (!/http/.test(value)) {
            value = domain + value;
        }
        return value;
    }

}

for (let i in Filters) {
    Vue.filter(i, Filters[i]);
}
export default Filters;