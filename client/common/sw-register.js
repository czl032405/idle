

var swRegistration = null;
navigator.serviceWorker && navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    console.info(registration)
    swRegistration = registration;

}).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
});


navigator.serviceWorker && navigator.serviceWorker.addEventListener('message', function (e) {
    if (e.data.id) {
        MessageResolves[e.data.id] && MessageResolves[e.data.id](e.data.data);
        delete MessageResolves[e.data.id];
    }
});

const MessageResolves = {}
const PostMessage = function (msg) {
    navigator.serviceWorker && navigator.serviceWorker.controller.postMessage(msg);
}

const ShowNotification = function (title) {
    swRegistration && swRegistration.showNotification(title)
}

const CallSW = async function (data) {
    return new Promise(resolve => {
        if(!navigator.serviceWorker){
            resolve("not support");
        }
        else if (!navigator.serviceWorker.controller) {
            resolve("not init controller");
        }
        else {
            var id = Math.floor(Math.random() * 10000000);
            PostMessage({ id, data });
            MessageResolves[id] = resolve;
        }
    })
}