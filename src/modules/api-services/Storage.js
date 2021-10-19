
const Storage = {

    set: (key, value) => {
        return new Promise((resolve, reject) => {
            chrome.storage.local.set({[key]: value}, () => {
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
            chrome.storage.local.get(key, (items) => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(items[key] || items);
            });
        })
    },

}

export default Storage
