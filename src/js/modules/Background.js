
export const handleMessage = {

    logMessage: (request, sender, sendResponse) => {
        console.log(request.message);
        sendResponse(`Hi from background, your tab id is ${sender.tab.id}`);
    },

    getGit: (request, sender, sendResponse) => {
        fetch('https://api.github.com/users/' + request.message)
            .then(response => response.json())
            .then(response => {
                sendResponse(response.bio);
            });
    },

    getConfig: (request, sender, sendResponse) => {
        fetch('http://localhost:8000/extension_config')
            .then(response => response.json())
            .then(response => {
                sendResponse(response);
            });
    },

}

const Background = {
    handleMessage: handleMessage,
}

export default Background;
