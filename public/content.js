// this script interacts with the DOM
import Messages from '../src/modules/api-services/Messages';

let message = {
    action: Messages.ACTIONS.GIT,
    message: 'pamplona007'
};

Messages.send(Messages.TARGETS.BACKGROUND, message)
    .then(response => console.log(response));
