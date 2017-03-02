var swRegistration = null;
navigator.serviceWorker.register('../service-worker.js').then(function (registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
    swRegistration = registration;

}).catch(function (err) {
    console.log('ServiceWorker registration failed: ', err);
});

const PostMessage = function (msg) {
    navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage(msg);
}
navigator.serviceWorker.addEventListener('message', function (e) {
    console.info(e.data);
    if (/notification:/i.test(e.data)) {
        const title = e.data.split(":")[1];
        swRegistration.showNotification(title);
    }
});