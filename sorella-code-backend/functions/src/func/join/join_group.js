const admin = require('firebase-admin');
const axios = require('axios');

const { saveGroup } = require('./../helper/database/groups_table');
const { sendReplyMessage } = require('./../helper/line_API_access');

const sendError = require('./../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken } = req.body.events[0];

    saveGroup(source.groupId)
        .then(() => {
            sendReplyMessage(replyToken, source.groupId, 'join_group')
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
