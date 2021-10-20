
const Tabs = {

    create: (url, active, otherProperties) => {
        const createOptions = {
            url: url,
            active: active,
            ...otherProperties
        };

        return new Promise((resolve, reject) => {
            chrome.tabs.create(createOptions, createdTab => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(createdTab)
            })
        })
    },

    discard: (tabId) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.discard(tabId, discardedTab => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(discardedTab)
            })
        })
    },

    remove: (tabId) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.remove(tabId, () => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve()
            })
        })
    },

    get: (tabId) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.get(tabId, targetTab => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(targetTab)
            })
        })
    },

    query: (queryInfo) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.query(queryInfo, targetTab => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(targetTab)
            })
        })
    },

    duplicate: (tabId) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.duplicate(tabId, targetTab => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(targetTab)
            })
        })
    },

    reload: (tabId, bypassCache) => {
        return new Promise((resolve, reject) => {
            chrome.tabs.reload(tabId, { bypassCache: bypassCache }, () => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve()
            })
        })
    },

    executeScript: (tabId, file, runAt, otherInjectionProperties) => {
        const injectDetails = {
            file: file,
            runAt: runAt,
            ...otherInjectionProperties
        };

        return new Promise((resolve, reject) => {
            chrome.tabs.executeScript(tabId, injectDetails, result => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(result)
            })
        })
    },

    insertCSS: (tabId, file, runAt, otherInjectionProperties) => {
        const injectDetails = {
            file: file,
            runAt: runAt,
            ...otherInjectionProperties
        };

        return new Promise((resolve, reject) => {
            chrome.tabs.insertCSS(tabId, injectDetails, result => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(result)
            })
        })
    },

}

export default Tabs;