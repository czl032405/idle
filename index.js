const pmx = require("pmx");
const util = require('util');
const exec = util.promisify(require('child_process').exec);



// pmx.action('client:build', function (reply) {
//     var child = spawn('npm', ['run', 'build'], { cwd: "./idle-client", stdio: "inherit" });
//     child.on('close', function () {
//         console.info('boom');
//         reply({ boom: true })
//     })
//     child.on('error', function (e) {
//         reply(e)
//     })
// })
// pmx.action('client:install', function (reply) {
//     var child = spawn('npm', ['install'], { cwd: "./idle-client", stdio: "inherit" });
//     child.on('close', function () {
//         console.info('boom');
//         reply({ boom: true })
//     })
//     child.on('error', function (e) {
//         reply(e)
//     })
// })

// pmx.action('server:build', function (reply) {
//     var child = spawn('npm', ['run', 'build'], { cwd: "./idle-server", stdio: "inherit" });
//     child.on('close', function () {
//         console.info('boom');
//         reply({ boom: true })
//     })
//     child.on('error', function (e) {
//         reply(e)
//     })
// })

// pmx.action('server:install', function (reply) {
//     var child = spawn('npm', ['install'], { cwd: "./idle-server", stdio: "inherit" });
//     child.on('close', function () {
//         console.info('boom');
//         reply({ boom: true })
//     })
//     child.on('error', function (e) {
//         reply(e)
//     })
// })


//todo 
var installClient = async function (reply) {
    reply = reply || function (e) {console.error(e) };
    try {
        reply('delete package-lock.json');
        var { stdout, stderr } = await exec('rm -rf package-lock.json', { cwd: "./idle-client" });
        reply(stdout)
        reply(stderr)


        reply('begin: npm install in ./idle-client')
        var { stdout, stderr } = await exec('npm install', { cwd: "./idle-client" });
        reply(stdout)
        reply(stderr)
        reply('end')

        reply('begin: npm run build in ./idle-client')
        var { stdout, stderr } = await exec('npm run build', { cwd: "./idle-client" });
        reply(stdout)
        reply(stderr)
        reply('end')

    } catch (error) {
        reply(error);
    }
}


var installServer = async function (reply) {
    reply = reply || function (e) {console.error(e) };
    try {
        reply('delete package-lock.json');
        var { stdout, stderr } = await exec('rm -rf package-lock.json', { cwd: "./idle-server" });
        reply(stdout)
        reply(stderr)

        reply('begin: npm install in ./idle-server')
        var { stdout, stderr } = await exec('npm install', { cwd: "./idle-server" });
        reply(stdout)
        reply(stderr)
        reply('end')

        reply('begin: npm run build in ./idle-server')
        var { stdout, stderr } = await exec('npm run build', { cwd: "./idle-server" });
        reply(stdout)
        reply(stderr)
        reply('end')

    } catch (error) {
        reply(error);
    }
}


pmx.action('client:install',installClient)

pmx.action('server:install',installServer);

require('./idle-server/dist');


