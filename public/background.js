// this script does NOT interact with the DOM
import Messages from '../src/modules/api-services/Messages';
import { messageActions } from '../src/modules/Background';

const handleMessage = async (request, sender, sendResponse) => {
    if (request.target === Messages.TARGETS.BACKGROUND) {
        switch (request.action) {
            case Messages.ACTIONS.LOG:
                messageActions.logMessage(request, sender, sendResponse);
                break;

            case Messages.ACTIONS.GIT:
                messageActions.getGit(request, sender, sendResponse);
                break;

            case Messages.ACTIONS.LOGIN:
                messageActions.userLogin(request, sender, sendResponse);
                break;

            case Messages.ACTIONS.GET_CONFIG:
                messageActions.getConfig(request, sender, sendResponse);
                break;

            default:
                console.error('Message could not be handled');
                break;
        }
        return true;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    let { target } = request;

    if (target !== Messages.TARGETS.BACKGROUND) {
        return;
    }

    handleMessage(request, sender, sendResponse);

    return true;
});
