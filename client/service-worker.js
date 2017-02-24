console.log("in service worker")

self.addEventListener("install", function () {
    console.log("service worker install")
})

self.addEventListener("active", function () {
    console.log("service worker active");
})

self.addEventListener("fetch", function (e) {
    console.log(e.request);

    var sampleRes = async function () {
        var myBlob = new Blob();
        var init = { "status": 200, "statusText": "SuperSmashingGreat!" };
        var myResponse = new Response("23333", init);
        return myResponse;
    }

    if (/233/.test(e.request.url)) {
        console.info("hit")
        e.respondWith(sampleRes())
    }

})


var count = 0;
setInterval(function () {
    const title = `boom${++count}`;
    const options = {
        body: 'Yay it works.',
    };
    self.registration.showNotification(title, options);
},2000)
