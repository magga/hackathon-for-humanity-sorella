const admin = require('firebase-admin');
const { createHmac } = require('crypto');
const axios = require('axios');

const { CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN, USER_ID } = require('./../secret/line');

module.exports = (req, res) => {
    const v = 'v10';

    console.log(v);
    console.log(req.body);

    const {
        type,
        lat,
        lng,
        button_id
    } = req.body;

    if (type === 'help') {
        const ref = admin.database().ref('friends');

        ref.on('value', (snapshot) => {
            ref.off();

            const { ids } = snapshot.val();

            console.log(`ids: ${ids}`);
            
            if (ids) {
                const headersAxios = {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
                };
        
                const bodyAxios = {
                    to: ids,
                    messages: [
                        {
                            type: "text",
                            text: `HELP!! User ${button_id} is being harrased. Her location is on : `
                        },
                        {
                            type: "location",
                            title: "Her location",
                            latitude: lat,
                            longitude: lng,
                            address: "Di sini"
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
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        });
    }

    res.send(v);
}

const checkSignature = (req, res) => {
    const channelSecret = CHANNEL_SECRET;
    const body = req.body.toString();
    const signature = createHmac('SHA256', channelSecret)
                        .update(body)
                        .digest('base64');
};
