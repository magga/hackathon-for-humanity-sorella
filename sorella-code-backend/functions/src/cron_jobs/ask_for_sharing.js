const { getAllUserId, getUserProfileFromDatabase } = require('./../func/helper/database/users_table');
const { sendPushMessage } = require('./../func/helper/line_API_access');

const sendError = require('./../func/helper/send_error');

module.exports = (req, res) => {
    getAllUserId()
        .then((ids) => {
            ids.map((id) => {
                getUserProfileFromDatabase(id)
                    .then((user) => {
                        sendPushMessage(user.line.profile.userId, user.line.profile.displayName, 'ask_for_sharing')
                            .then(() => {
                                
                            })
                            .catch((err) => {

                            });
                    })
                    .catch(() => {
                        
                    });
            });

            console.log('OK');
            res.send('OK');
        })
        .catch((err) => {
            sendError(res, err);
        });
};
