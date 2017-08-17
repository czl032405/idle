import * as  pmx from 'pmx';
pmx.action('test', function (reply) {
    reply({ time: new Date() });
})