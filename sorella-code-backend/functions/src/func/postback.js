const qs = require('querystring');

const pekerjaanPostback = require('./postback/pekerjaan_postback');
const jamPulangPostback = require('./postback/jam_pulang_postback');

const sendError = require('./helper/send_error');

module.exports = (req, res) => {
    const { postback } = req.body.events[0];

    const data = qs.parse(postback.data);

    switch (data.action) {
        case 'pekerjaan':
            pekerjaanPostback(req, res);
            break;
        case 'jam-pulang':
            jamPulangPostback(req, res);
            break;
        default:
            sendError(res, 'Keyword POSTBACK TYPE not found');
            break;
    }
};
