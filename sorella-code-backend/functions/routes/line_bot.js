const admin = require('firebase-admin');
const { createHmac } = require('crypto');
const axios = require('axios');

const { CHANNEL_SECRET, CHANNEL_ACCESS_TOKEN } = require('./../secret/line');

module.exports = (req, res) => {
    const v = 'v3';
    console.log(v);
    console.log(req.body);
    console.log(req.body.events[0].message);
    
    const { type, source, replyToken, message } = req.body.events[0];

    if (type === 'follow') {
        followCallback(source.userId, replyToken, res);
    } else if (type === 'message') {
        if (message.type === 'location') {
            sendHelpToAllUser(source.userId, message, res);
        } else {
            sendMessageToUser(source.userId, replyToken, res);
        }
    } else if (type === join) {
        groupsCallback(source.groupId, replyToken, res);
    } else {
        res.send('SUCCESS');
    }
}

const checkSignature = (req, res) => {
    const channelSecret = CHANNEL_SECRET;
    const body = req.body.toString();
    const signature = createHmac('SHA256', channelSecret)
                        .update(body)
                        .digest('base64');
};

const followCallback = (userId, replyToken, res) => {
    insertUserIdToDatabase(userId, replyToken, res);
}

const groupsCallback = (groupId, replyToken, res) => {
    insertGroupIdToDatabase(userId, replyToken, res);
}

const insertUserIdToDatabase = (userId, replyToken, res) => {
    console.log(`Userid : ${userId}, Reply Token : ${replyToken}`);

    const ref = admin.database().ref('friends');

    ref.on('value', (snapshot) => {
        ref.off();

        const { ids } = snapshot.val();

        console.log(`ids: ${ids}`);
        
        if (!ids) {
            let arr = [];
            arr.push(userId);

            ref.child('ids').set(arr)
                .then(() => {
                    console.log('SUCCESS');
                    sendMessageToUser(userId, replyToken);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        } else {
            if (ids.indexOf(userId) === -1) {
                ids.push(userId);

                ref.child('ids').set(ids)
                .then(() => {
                    console.log('SUCCESS');
                    sendMessageToUser(userId, replyToken);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
            }
        }
    });
}

const insertGroupIdToDatabase = (groupId, replyToken, res) => {
    console.log(`Groupid : ${groupId}, Reply Token : ${replyToken}`);

    const ref = admin.database().ref('groups');

    ref.on('value', (snapshot) => {
        ref.off();

        const { ids } = snapshot.val();

        console.log(`ids: ${ids}`);
        
        if (!ids) {
            let arr = [];
            arr.push(groupId);

            ref.child('ids').set(arr)
                .then(() => {
                    console.log('SUCCESS');
                    sendMessageToUser(groupId, replyToken);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
        } else {
            if (ids.indexOf(groupId) === -1) {
                ids.push(groupId);

                ref.child('ids').set(ids)
                .then(() => {
                    console.log('SUCCESS');
                    sendMessageToUser(groupId, replyToken);
                })
                .catch((err) => {
                    console.log(err);
                    res.send(err);
                });
            }
        }
    });
}

const sendMessageToUser = (userId, replyToken, res) => {
    console.log('message');

    const headersAxios = {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
    };

    const bodyAxios = {
        replyToken: replyToken,
        messages: [
            {
                type: "text",
                text: `Hello ${userId}`
            },
            {
                type: "sticker",
                packageId: 1,
                stickerId: 5
            },
            {
                type: "text",
                text: "Selamat datang di chat kami, Sorella"
            }
        ]
    };

    axios({
        method: 'POST',
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headersAxios,
        data: bodyAxios
    })
    .then(() => {
        console.log('SEND MESSAGE SUCCESS');
    })
    .catch((err) => {
        console.log(err);
    });
    
    res.send('SUCCESS');
};

const sendHelpToAllUser = (userId, message, res) => {
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
                        text: `HELP!! User ${userId} is being harrased. Her location is on : `
                    },
                    {
                        type: "location",
                        title: "Her location",
                        latitude: message.latitude,
                        longitude: message.longitude,
                        address: message.address
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
};
