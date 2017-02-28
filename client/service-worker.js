const version = '1.0.0';
var needUpdateManifest = true;
self.addEventListener("install", function () {
    console.log("service worker install")
})

self.addEventListener("activate", function (e) {
    console.log("service worker activate");
})

self.addEventListener("fetch", async function (e) {
    if (!/manifest|api\//.test(e.request.url)) {
        e.respondWith(respondFilter(e.request));
    }
})

const respondFilter = async function (request) {
    if (needUpdateManifest) {
        await loadManifest();
    }
    var cache = await caches.open(version)
    var res = await cache.match(request);
    if (res) {
        return res;
    }
    else {
        if (/cdn/.test(request.url)) {
            await cache.add(request.url);
            return await cache.match(request);
        }
        return fetch(request, {
            credentials: 'same-origin',
        });
    }
}


const loadManifest = async function () {
    console.info("load manifest");
    needUpdateManifest = false;
    const storage = new ServiceWorkerStorage('Idle', 1);
    var res = await fetch("/manifest", {
        credentials: 'same-origin',
    });
    //await storage.removeItem("manifest");
    var currentManifest = await storage.getItem('manifest') || { files: {} };
    var manifest = await res.json();
    await storage.setItem('manifest', manifest);
    var cache = await caches.open(version);
    for (let i in manifest.files) {
        if (!currentManifest.files[i] || currentManifest.files[i].hash != manifest.files[i].hash) {
            console.info("add cache" + i);
            var res = await fetch(i, {
                credentials: 'same-origin',
            });
            await cache.put(i, res);

        }
    }

    setTimeout(function () {
        needUpdateManifest = true;
    }, 1000);

}



/**
 * ServiceWorkerStorage
 * https://github.com/RyotaSugawara/serviceworker-storage/blob/master/src/ServiceWorkerStorage.js
 */

const IDB_TRANSACTION_MODE = {
    readonly: 'readonly',
    readwrite: 'readwrite',
    versionchange: 'versionchange'
};

function promisify(idbRequest) {
    return new Promise(function (resolve, reject) {
        idbRequest.onsuccess = function () {
            resolve(idbRequest.result);
        };
        idbRequest.onerror = reject;
    });
}

class ServiceWorkerStorage {
    constructor(db_name, version) {
        if (typeof db_name !== 'string') throw new TypeError('db_name must be string.');
        if (typeof version !== 'number') throw new TypeError('version must be number.');
        const VERSION = version;
        this.DB_NAME = db_name;
        this.STORE_NAME = 'sw_storage';

        const db = self.indexedDB.open(this.DB_NAME, VERSION);
        db.onupgradeneeded = event => {
            const _db = event.target.result;
            if (_db.objectStoreNames && _db.objectStoreNames.contains(this.STORE_NAME)) return;
            _db.createObjectStore(this.STORE_NAME);
        };
        this.__db = promisify(db);
    }
    accessAsyncStore(mode) {
        return this.__db.then(db => {
            const transaction = db.transaction(this.STORE_NAME, mode);
            return transaction.objectStore(this.STORE_NAME);
        });
    }
    getItem(key) {
        return this.accessAsyncStore(IDB_TRANSACTION_MODE.readonly)
            .then(store => store.get(key))
            .then(promisify);
    }
    setItem(key, value) {
        return this.accessAsyncStore(IDB_TRANSACTION_MODE.readwrite)
            .then(store => store.put(value, key))
            .then(promisify);
    }
    removeItem(key) {
        return this.accessAsyncStore(IDB_TRANSACTION_MODE.readwrite)
            .then(store => store['delete'](key))
            .then(promisify);
    }
    clean() {
        return this.__db
            .then(db => {
                const transaction = db.transaction(db.objectStoreNames, IDB_TRANSACTION_MODE.readwrite);
                const q = [];
                for (let i = 0, len = db.objectStoreNames.length; i < len; i++) {
                    let store_name = db.objectStoreNames[i];
                    q.push(promisify(transaction.objectStore(store_name).clear()));
                }
                return Promise.all(q);
            });
    }
}