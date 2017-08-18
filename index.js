// var pmx = require("pmx");
// var spawn = require('child_process').spawn;
// pmx.action('client:build', function (reply) {
//     var child = spawn('npm', ['run','build'],{cwd:"./idle-client"});
//     child.stdout.on('data', function (chunk) {
//         chunk.toString().split('\n').forEach(function (line) {
//             res.send(line); 
//         });
//     });
//     child.stdout.on('end', function (chunk) {
//         res.end('end'); 
//     });
//     child.on('error', function (e) {
//         res.error(e);  
//     });

// })

require('./idle-server/dist');
