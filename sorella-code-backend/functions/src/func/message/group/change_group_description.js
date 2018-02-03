const { changeGroupDescription } = require('./../../helper/database/groups_table');
const { sendReplyMessage } = require('./../../helper/line_API_access');

const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken, message } = req.body.events[0];
    const { groupId } = source;
    const { text } = message

    const arrWord = text.split(' ');
    let groupDescription = '';

    for (let i = 3; i < arrWord.length; i++) {
        groupDescription = groupDescription + arrWord[i] + ' ';
    }

    groupDescription = groupDescription.trim();

    changeGroupDescription(groupId, groupDescription)
        .then(() => {
            sendReplyMessage(replyToken, '', 'change_group_description')
                .then(() => {
                    res.send('OK');
                })
                .catch((err) => {
                    sendError(res, err);
                });
        })
        .catch((err) => {
            sendError(res, err);
        });
};
