const { insertButtonId } = require('./../../helper/database/users_table');
const { addUserToButton } = require('./../../helper/database/button_table');
const { sendReplyMessage } = require('./../../helper/line_API_access');

const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken, message } = req.body.events[0];
    const { userId } = source;
    const { text } = message

    const arrWord = text.split(' ');
    const buttonId = arrWord[2];

    if (!buttonId) {
        return sendError(res, 'BUTTON ID Not Defined');
    }

    insertButtonId(userId, buttonId)
        .then(() => {
            addUserToButton(userId, buttonId)
                .then(() => {
                    sendReplyMessage(replyToken, buttonId, 'add_user_button')
                        .then(() => {
                            console.log('ADD BUTTON OK');
                            res.send('ADD BUTTON OK');
                        })
                        .catch((err) => {
                            sendError(res, err);
                        });
                })
                .catch((err) => {
                    sendError(res, err);
                });
        })
        .catch((err) => {
            sendError(res, err)
        });
};
