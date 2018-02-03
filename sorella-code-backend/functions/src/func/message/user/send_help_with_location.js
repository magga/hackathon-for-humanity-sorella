const _ = require('lodash');

const { getUserProfileFromDatabase } = require('./../../helper/database/users_table');
const { sendPushMessage } = require('./../../helper/line_API_access');

const sendError = require('./../../helper/send_error');

module.exports = (req, res) => {
    const { message, source } = req.body.events[0];
    const { userId } = source;

    getUserProfileFromDatabase(userId)
        .then((user) => {
            const { data, line } = user;

            if (!data || !data.groups) {
                sendError(res, 'No groups found');
                return;
            }

            const arrGroup = _.keys(data.groups);

            message.displayName = user.line.profile.displayName;

            arrGroup.map((groupId) => {
                sendPushMessage(groupId, message, 'send_help_with_location')
                    .then(() => {
                        res.send('OK');
                    })
                    .catch((err) => {
                        sendError(res, err);
                    });
            });
        });
};
