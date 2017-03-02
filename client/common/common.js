const PopMessage = function (msg) {
    window.vm && (window.vm.msg = msg);
};

const log = function (msg) {
    window.vm && (window.vm.logs.push(msg));
};

