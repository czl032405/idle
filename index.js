var pmx = require("pmx");
var spawn = require('child_process').spawn;
pmx.action('client:build', function (reply) {
    var child = spawn('npm', ['run', 'build'], { cwd: "./idle-client", stdio: "inherit"});
    child.on('close',function(){
        console.info('boom')
    })
})

pmx.action('server:build', function (reply) {
    var child = spawn('npm', ['run', 'build'], { cwd: "./idle-server", stdio: "inherit"});
    child.on('close',function(){
        console.info('boom')
    })
})

require('./idle-server/dist');


