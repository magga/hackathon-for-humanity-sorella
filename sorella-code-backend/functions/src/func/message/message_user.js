const sendHelpWithLocation = require('./user/send_help_with_location');
const textUserMessageHandler = require('./user/text_user_message_handler');

const sendError = require('./../helper/send_error');

module.exports = (req, res) => {
    const { message } = req.body.events[0];

    switch (message.type.toLowerCase()) {
        case 'location':
            sendHelpWithLocation(req, res);
            break;
        case 'text':
            textUserMessageHandler(req, res);
            break;
        default:
            sendError(res, 'Command MESSAGE USER not found');
            break;
    }
};
