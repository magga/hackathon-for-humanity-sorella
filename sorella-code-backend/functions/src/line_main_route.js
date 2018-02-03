const followHandler = require('./func/follow');
const unfollowHandler = require('./func/unfollow');
const joinHandler = require('./func/join');
const messageHandler = require('./func/message');
const leaveHandler = require('./func/leave');
const postbackHandler = require('./func/postback');

module.exports = (req, res) => {
    console.log(req.body);

    if (!req.body.events) {
        return res.send({ message: 'Command not found' });
    }

    const { type, source, message, postback } = req.body.events[0];

    console.log(source);

    if (message) {
        console.log(message);
    }

    if (postback) {
        console.log(postback);
    }

    switch (type.toLowerCase()) {
        case 'follow':
            followHandler(req, res);
            break;
        case 'unfollow':
            unfollowHandler(req, res);
            break;
        case 'join':
            joinHandler(req, res);
            break;
        // case 'leave':
        //     leaveHandler(req, res);
        //     break;
        case 'message':
            messageHandler(req, res);
            break;
        case 'postback':
            postbackHandler(req, res);
            break;
        default:
            res.send({ message: 'Command not found' });
            break;
    }
};
