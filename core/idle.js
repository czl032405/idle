const glob = require('glob');
const Engine = require('./engine/engine.js');
const Data = require('./data/data.js');
const args = process.argv.join(" ");;
console.info(args)
const Idle = {
    Engine,
    Data,
}
module.exports = Idle;


if (/test/.test(args)) {
    var test = function () {
        var tests = glob.sync("./test/*.js", { cwd: __dirname });
        tests.forEach(test => {
            require(test);
        });
    }
    test();
}



