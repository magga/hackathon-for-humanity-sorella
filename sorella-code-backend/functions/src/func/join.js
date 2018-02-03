const admin = require('firebase-admin');
const axios = require('axios');

const joinGroup = require('./join/join_group');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { source } = req.body.events[0];

    switch (source.type.toLowerCase()) {
        case 'group':
            joinGroup(req, res);
            break;
        default:
            console.log('Command JOIN TYPE not found');
            res.send({ message: 'Command JOIN TYPE not found' });
            break;
    }
};
