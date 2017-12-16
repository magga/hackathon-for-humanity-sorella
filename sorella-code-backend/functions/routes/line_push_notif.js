const admin = require('firebase-admin');
const axios = require('axios');

const { 
    CHANNEL_SECRET, 
    CHANNEL_ACCESS_TOKEN,
    USER_ID
} = require('./../secret/line');

module.exports = (req, res) => {
    const headersAxios = {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
    };

    const bodyAxios = {
        to: [USER_ID],
        messages: [
            {
                type: "text",
                text: `Hello, ${USER_ID}`
            },
            {
                type: "sticker",
                packageId: 4,
                stickerId: 271
            },
            {
                type: "text",
                text: req.body.message
            }
        ]
    };

    axios({
        method: 'POST',
        url: 'https://api.line.me/v2/bot/message/multicast',
        headers: headersAxios,
        data: bodyAxios
    })
    .then(() => {
        console.log('SEND MESSAGE SUCCESS');
        return res.send('SUCCESS');
    })
    .catch((err) => {
        console.log(err);
        return res.send(err);
    });
}
