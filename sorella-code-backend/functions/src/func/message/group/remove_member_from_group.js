const { removeMember } = require('./../../helper/database/groups_table');
const { sendReplyMessage, getUserProfile } = require('./../../helper/line_API_access');
const { removeGroup } = require('./../../helper/database/users_table');

const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { source, replyToken, message } = req.body.events[0];
    const { groupId, userId} = source;

    removeMember(groupId, userId)
        .then(() => {
            removeGroup(groupId, userId)
                .then(() => {
                    getUserProfile(userId)
                        .then((user) => {
                            sendReplyMessage(replyToken, user.displayName, 'remove_member_from_group')
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
                })
                .catch((err) => {
                    sendError(res, err);        
                });
        })
        .catch((err) => {
            sendError(res, err);
        });
};
