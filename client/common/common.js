const PopMessage = function (msg) {
    window.vm && (window.vm.msg = msg);
};

const log = function (msg) {
    window.vm && (window.vm.logs.push(msg));
};

const trampoline = async function (func, arg) {
    var value = await func(arg);
    console.info(func)
    console.info(typeof value);
    while (typeof value == 'function') {
        value = await value();
    }
    return value;
};

