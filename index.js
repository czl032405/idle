const pmx = require("pmx");
const util = require('util');
const exec = util.promisify(require('child_process').exec);


var installClient = async function (data,res) {
    try {
        res.send('delete package-lock.json');
        var { stdout, stderr } = await exec('rm -rf package-lock.json', { cwd: "./idle-client" });
        res.send(stdout)
        res.send(stderr)


        res.send('begin: npm install in ./idle-client')
        var { stdout, stderr } = await exec('npm install', { cwd: "./idle-client" });
        res.send(stdout)
        res.send(stderr)
        res.send('end')

        res.send('begin: npm run build in ./idle-client')
        var { stdout, stderr } = await exec('npm run build', { cwd: "./idle-client" });
        res.send(stdout)
        res.send(stderr)
        res.send('end')

        res.end('action end');

    } catch (error) {
        res.error(error);
    }
}


var installServer = async function (data,res) {
    try {
        res.send('delete package-lock.json');
        var { stdout, stderr } = await exec('rm -rf package-lock.json', { cwd: "./idle-server" });
        res.send(stdout)
        res.send(stderr)

        res.send('begin: npm install in ./idle-server')
        var { stdout, stderr } = await exec('npm install', { cwd: "./idle-server" });
        res.send(stdout)
        res.send(stderr)
        res.send('end')

        res.send('begin: npm run build in ./idle-server')
        var { stdout, stderr } = await exec('npm run build', { cwd: "./idle-server" });
        res.send(stdout)
        res.send(stderr)
        res.send('end')

        res.end('action end')

    } catch (error) {
        res.erro(error);
    }
}


pmx.scopedAction('client:install',installClient)

pmx.scopedAction('server:install',installServer);

require('./idle-server/dist');


