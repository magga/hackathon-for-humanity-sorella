const admin = require('firebase-admin');
const axios = require('axios');

const { getUserProfile, sendReplyMessage } = require('./helper/line_API_access');
const { saveUserProfile } = require('./helper/database/users_table');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { type, source, replyToken } = req.body.events[0];

    getUserProfile(source.userId)
        .then((user) => {
            saveUserProfile(user)
                .then(() => {
                    sendReplyMessage(replyToken, user.displayName, 'follow')
                        .then(() => {
                            res.send(user);
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



// FIREBASE FUNCTIONS DOESN'T SUPPORT ASYNC / AWAIT

// module.exports = async (req, res) => {
//     const { type, source, replyToken } = req.body.events[0];

//     try {
//         const user = await getUserProfile(source.userId);
//         await saveUserProfile(user);
//         await sendReplyMessage(replyToken, user.displayName);
//         res.send(user);
//     } catch (error) {
//         sendError(error);
//     }
// };
