// this script interacts with the DOM
import Message from './modules/api-services/Messages';

let message = {
    action: Message.ACTIONS.GIT,
    message: 'pamplona007'
};

Message.send(Message.TARGETS.BACKGROUND, message)
    .then(response => console.log(response));
