const { setFriendWithBotSetting } = require('./helper/database/users_table');
const { sendReplyMessage } = require('./helper/line_API_access');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken } = req.body.events[0];

    setFriendWithBotSetting(source.userId, false)
        .then(() => {
            // sendReplyMessage(replyToken, '', 'unfollow')
            //     .then(() => {
            //         res.send(user);
            //     })
            //     .catch((err) => {
            //         sendError(res, err);
            //     });

            console.log('UNFOLLOW OK');
            res.send('UNFOLLOW OK');
        })
        .catch((err) => {
            sendError(res, err);
        });
};
