const { sendReplyMessage } = require('./../../helper/line_API_access');
const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken } = req.body.events[0];
    const { groupId} = source;

    sendReplyMessage(replyToken, groupId, 'join_group')
        .then(() => {
            res.send('OK');
        })
        .catch((err) => {
            sendError(res, err);
        });
};
