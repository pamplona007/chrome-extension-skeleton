

const Messages = {

    TARGETS: {
        BACKGROUND: 'background',
        CONTENT: 'content',
        POPUP: 'popup'
    },

    ACTIONS: {
        LOG: 'log',
        GIT: 'git',
        LOGIN: 'login',
        GET_CONFIG: 'getConfig'
    },

    send: (target, body) => {
        let message = {
            target: target,
            ...body
        };

        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(message, response => {
                if (chrome.runtime.lastError) {
                    console.warn("Whoops.. " + chrome.runtime.lastError.message)
                    reject(chrome.runtime.lastError.message);
                }
                resolve(response)
            });
        })
    },

}

export default Messages
