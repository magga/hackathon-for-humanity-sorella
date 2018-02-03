const admin = require('firebase-admin');
const axios = require('axios');

const messageGroup = require('./message/message_group');
const messageUser = require('./message/message_user');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { source } = req.body.events[0];

    switch (source.type.toLowerCase()) {
        case 'group':
            messageGroup(req, res);
            break;
        case 'user':
            messageUser(req, res);
            break;
        default:
            console.log('Command MESSAGE TYPE not found');
            res.send({ message: 'Command MESSAGE TYPE not found' });
            break;
    }
};
