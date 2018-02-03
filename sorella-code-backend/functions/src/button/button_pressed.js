const admin = require('firebase-admin');
const _ = require('lodash');

const { insertButtonPressed, getUserProfileFromDatabase } = require('./../func/helper/database/users_table');
const { getUserIdFromButtonId } = require('./../func/helper/database/button_table');
const { sendPushMessage } = require('./../func/helper/line_API_access');

const sendError = require('./../func/helper/send_error');

module.exports = (req, res) => {
    console.log(req.body);

    const { type, latitude, longitude, button_id } = req.body;

    if (!type || !latitude || !longitude || !button_id ) {
        return sendError(res, 'Body tidak lengkap. Dibutuhkan : type, latitude, longitude, dan button_id');
    }

    const timeStamp = Math.floor(Date.now() / 1000);
    const dataPressed = {
        type, latitude, longitude, button_id, timeStamp
    };

    getUserIdFromButtonId(button_id)
        .then((userId) => {
            getUserProfileFromDatabase(userId)
                .then((user) => {
                    const { data, line } = user;

                    if (!data || !data.groups) {
                        sendError(res, 'No groups found');
                        return;
                    }

                    const arrGroup = _.keys(data.groups);

                    dataPressed.displayName = user.line.profile.displayName;

                    arrGroup.map((groupId, index) => {
                        sendPushMessage(groupId, dataPressed, 'send_help_with_location')
                            .then(() => {
                                if (index === arrGroup.length - 1) {
                                    insertButtonPressed(userId, dataPressed)
                                        .then(() => {
                                            res.send(`OK. ${arrGroup.length} group(s) have been warned`);
                                        })
                                        .catch((err) => {
                                            sendError(res, err);
                                        });
                                }
                            })
                            .catch((err) => {
                                sendError(res, err);
                            });
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
