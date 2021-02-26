// this script does NOT interact with the DOM
import Message from './modules/api-services/Messages';
import { handleMessage } from './modules/Background';

Message.addListener((request, sender, sendResponse) => {
    if (request.target === Message.TARGETS.BACKGROUND) {
        switch (request.action) {
            case Message.ACTIONS.LOG:
                handleMessage.logMessage(request, sender, sendResponse);
                break;

            case Message.ACTIONS.GIT:
                handleMessage.getGit(request, sender, sendResponse);
                break;

            case Message.ACTIONS.LOGIN:
                handleMessage.userLogin(request, sender, sendResponse);
                break;

            case Message.ACTIONS.GET_CONFIG:
                handleMessage.getConfig(request, sender, sendResponse);
                break;

            default:
                console.error('Message could not be handled');
                break;
        }
        return true;
    }
});
