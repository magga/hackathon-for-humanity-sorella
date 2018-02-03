const qs = require('querystring');

const { insertJobsJob } = require('./../helper/database/users_table');
const { sendReplyMessage } = require('./../helper/line_API_access');
const sendError = require('./../helper/send_error');

module.exports = (req, res) => {
    const { postback, source, replyToken } = req.body.events[0];
    const { userId } = source;

    const data = qs.parse(postback.data);

    insertJobsJob(userId, data.payload)
        .then(() => {
            let event = 'reply_postback_job';

            if (data.payload === 'rumah') {
                event = 'final_join_postback';
            }

            sendReplyMessage(replyToken, data.payload, event)
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
