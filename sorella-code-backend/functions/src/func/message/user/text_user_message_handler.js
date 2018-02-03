const addUserButton = require('./add_user_button');
const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { message } = req.body.events[0];
    const { type, text } = message;

    const arrWord = text.split(' ');

    if (`${arrWord[0]} ${arrWord[1]}`.toLowerCase() === 'sorella button' && arrWord[2]) {
        addUserButton(req, res);
    } else {
        sendError(res, 'Message not recognized');
    }
};
