// this script runs on the popup html
import Messages from './services/Messages';
import '../src/assets/scss/popup.scss';

document.getElementById('login-form').addEventListener('submit', () => {
    callIdentityApi();
});

const callIdentityApi = () => {
    let requestBody = {
        "id": document.getElementById('id').value,
        "password": document.getElementById('password').value,
    }

    let message = {
        action: Messages.ACTIONS.LOGIN,
        message: requestBody
    };

    Messages.send(Messages.TARGETS.BACKGROUND, message)
        .then(response => {
            console.log(response);
        })
};
