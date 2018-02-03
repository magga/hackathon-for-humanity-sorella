const qs = require('querystring');

const { insertJobsTimeHome } = require('./../helper/database/users_table');
const { sendReplyMessage } = require('./../helper/line_API_access');

const sendError = require('./../helper/send_error');

module.exports = (req, res) => {
    const { postback, source, replyToken } = req.body.events[0];
    const { userId } = source;

    insertJobsTimeHome(userId, postback.params.time)
        .then(() => {
            sendReplyMessage(replyToken, '', 'final_join_postback')
                .then(() => {
                    console.log('OK');
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
