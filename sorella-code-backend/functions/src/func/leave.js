const admin = require('firebase-admin');
const axios = require('axios');

const leaveGroup = require('./leave/leave_group');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { source } = req.body.events[0];

    switch (source.type.toLowerCase()) {
        case 'group':
            leaveGroup(req, res);
            break;
        default:
            sendError('Command LEAVE TYPE not found');
            break;
    }
};
