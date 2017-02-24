const glob = require('glob');
const Engine = require('./engine/engine.js');
const Action = require('./action/action.js');
const Data = require('./data/data.js');
const args = process.argv.join(" ");;
console.info(args)
const Idle = {
    Engine,
    Action,
    Data,
}
module.exports = Idle;




