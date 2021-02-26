// this script runs on the popup html
import Message from './modules/api-services/Messages';
import '../css/popup.css';

document.getElementById('login-form').addEventListener('submit', () => {
    callIdentityApi();
});

const callIdentityApi = () => {
    let requestBody = {
        "id": document.getElementById('id').value,
        "password": document.getElementById('password').value,
    }

    let message = {
        action: Message.ACTIONS.LOGIN,
        message: requestBody
    };

    Message.send(Message.TARGETS.BACKGROUND, message)
        .then(response => {
            console.log(response);
        })
};
