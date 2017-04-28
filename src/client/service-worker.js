const version = '1.0.0';
self.addEventListener("install", function () {
    console.log("service worker install")
})

self.addEventListener("activate", function (e) {
    console.log("service worker activate");
    showNotification(`welcome back`)

})

self.addEventListener("fetch", async function (e) {
    // if (!/manifest|api\//.test(e.request.url)) {
    //     e.respondWith(respondFilter(e.request));
    // }
})

self.addEventListener("message", async function (e) {
    if (e.data.id) {
        if (e.data.data == "getCountTest") {
         
        }
        PostMessage({ id:e.data.id, data: "received" });
    }

})
self.addEventListener("error", function (e) {
    PostMessage(`notification:err:${e.message}`)
})



const PostMessage = function (msg) {
    self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            client.postMessage(msg);
        });
    });
}

const showNotification = function (title) {
    self.registration.showNotification(title);
}

//del
const respondFilter = async function (request) {
    var cache = await caches.open(version)
    var res = await cache.match(request);
    if (res) {
        return res;
    }
    else {
        return fetch(request, {
            credentials: 'same-origin',
        });
    }
}


//del 
const loadManifest = async function () {
    console.info("load manifest");
    needUpdateManifest = false;
    var cache = await caches.open(version);
    var manifestRes = await fetch("/manifest", {
        credentials: 'same-origin',
    });
    var manifest = await manifestRes.json();
    for (let i in manifest.files) {
        var cacheReqArr = await cache.keys(i);
        if (!cacheReqArr.length || cacheReqArr[0].headers.get('hash') != manifest.files[i].hash) {
            console.info("add cache" + i);
            var req = new Request(i, {
                headers: new Headers({
                    hash: manifest.files[i].hash,
                })
            })
            var res = await fetch(req, {
                credentials: 'same-origin',
            });
            await cache.put(req, res);
        }
    }
    setTimeout(function () {
        needUpdateManifest = true;
    }, 2000);
}


