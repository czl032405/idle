var pmx = require("pmx");
var spawn = require('child_process').spawn;
pmx.action('client:build', function (reply) {
    var child = spawn('npm', ['run', 'build'], { cwd: "./idle-client", stdio: "inherit" });
    child.on('close', function () {
        console.info('boom');
        reply({ boom: true })
    })
    child.on('error', function (e) {
        reply(e)
    })
})

pmx.action('server:build', function (reply) {
    var child = spawn('npm', ['run', 'build'], { cwd: "./idle-server", stdio: "inherit" });
    child.on('close', function () {
        console.info('boom');
        reply({ boom: true })
    })
    child.on('error', function (e) {
        reply(e)
    })
})

require('./idle-server/dist');


