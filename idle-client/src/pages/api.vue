<template>
    <div class="container">
        <div v-for="(item1,key1) in  Api" v-if="typeof Api[key1] == 'object'">
            <h2>{{key1}}</h2>
            <div v-for="(item2,key2) in Api[key1]" v-if="typeof Api[key1][key2] == 'function'">
                <h5>{{key1}}/{{key2}}</h5>
                <input class="mr-2" type="text" v-model="param.value" v-for="(param,index) in ApiMap[key1][key2]" :placeholder="param.name"
                    v-if="param">
                <button class="btn btn-primary btn-sm" @click="action(key1,key2)">action</button>
                <div class="result">
                    {{result[key1][key2]}}
                </div>
                <!--<div class="result">{{result[key1][key2]}}</div>-->
                <hr>
            </div>
        </div>
    </div>
</template>
<script>
    import Api from 'common/api';
    import { ApiMap } from 'common/api';
    export default {
        name: 'api',
        data() {
            var result = {};
            Object.keys(ApiMap).forEach(key1 => {
                Object.keys(ApiMap[key1]).forEach(key2 => {
                    result[key1] = result[key1] || {}
                    result[key1][key2] = result[key1][key2] || "";

                })
            })
            return {
                Api,
                ApiMap,
                result

            };
        },
        mounted() {

        },
        methods: {
            async action(key1, key2) {
                var params = ApiMap[key1][key2];
                params = params.reduce((acc, param) => {
                    acc[param.name] = param.value;
                    return acc;
                }, {});
                try {
                    var result = await Api[key1][key2](params);
                }
                catch (e) {
                    result = e;
                }

                this.result[key1][key2] = result;
                console.info(result);

            }
        },


    }

</script>