
const SyncStorage = {

    set: (key, value) => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.set({[key]: value}, () => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve({
                    [key]: value
                });
            });
        })
    },

    get: (key) => {
        return new Promise((resolve, reject) => {
            chrome.storage.sync.get(key, (items) => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(items[key] || items);
            });
        })
    },

}

export default SyncStorage
