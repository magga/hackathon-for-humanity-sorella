const admin = require('firebase-admin');

const sendError = require('./../func/helper/send_error');

module.exports = (req, res) => {
    console.log(req.body);

    const { type, lat, lng, button_id } = req.body;

    if (!type || !lat || !lng || !button_id ) {
        return sendError(res, 'Body tidak lengkap. Dibutuhkan : type, lat, lng, dan button_id');
    }

    const timeStamp = Math.floor(Date.now() / 1000); 
    const ref = admin.database().ref(`test/button/${timeStamp}`);

    ref.set({
        type, lat, lng, button_id, timeStamp
    })
    .then(() => {
        return res.send('OK');
    })
    .catch((err) => {
        return sendError(res, err);
    });
};
