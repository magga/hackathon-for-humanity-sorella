const { sendReplyMessage } = require('./../../helper/line_API_access');
const sendError = require('./../../helper/send_error');

const { getGroupMember } = require('./../../helper/database/groups_table');
const { getUserNamesFromList } = require('./../../helper/database/users_table');

module.exports = (req, res) => {
    const { source, replyToken } = req.body.events[0];
    const { groupId} = source;

    getGroupMember(groupId)
        .then((listMemberId) => {
            getUserNamesFromList(listMemberId)
                .then((listMemberName) => {
                    sendReplyMessage(replyToken, listMemberName, 'list_added_user_in_group')
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
};
