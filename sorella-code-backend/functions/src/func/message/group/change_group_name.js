const { changeGroupName } = require('./../../helper/database/groups_table');
const { sendReplyMessage } = require('./../../helper/line_API_access');

const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken, message } = req.body.events[0];
    const { groupId, userId} = source;
    const { text } = message

    const arrWord = text.split(' ');
    let groupName = '';

    for (let i = 3; i < arrWord.length; i++) {
        groupName = groupName + arrWord[i] + ' ';
    }

    groupName = groupName.trim();

    changeGroupName(groupId, groupName)
        .then(() => {
            sendReplyMessage(replyToken, groupName, 'change_group_name')
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
