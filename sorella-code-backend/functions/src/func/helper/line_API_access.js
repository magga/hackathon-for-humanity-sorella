const admin = require('firebase-admin');
const axios = require('axios');

const { GET_PROFILE_URL } = require('./line_API_URL');
const { CHANNEL_ACCESS_TOKEN } = require('./../../secret/line');
const { 
    followReplyTemplate, 
    unfollowReplyTemplate, 
    joinGroupReplyTemplate ,
    addMemberToGroupReplyTemplate,
    removeMemberFromGroupReplyTemplate,
    changeGroupNameReplyTemplate,
    changeGroupDescriptionReplyTemplate,
    sendHelpWithLocationReplyTemplate,
    listAddedUserInGroupReplyTemplate,
    replyPostbackJobReplyTemplate,
    finalJoinPostbackReplyTemplate,
    askForSharingReplyTemplate,
    addUserButtonReplyTemplate
} = require('./line_message_template');

const getUserProfile = (userID) => {
    return new Promise((resolve, reject) => {
        const headersAxios = {
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        };
    
        axios({
            method: 'GET',
            url: `${GET_PROFILE_URL}/${userID}`,
            headers: headersAxios
        })
        .then((res) => {
            resolve(res.data);
        })
        .catch((err) => {
            reject(err);
        });
    });
};

const sendReplyMessage = (replyToken, identifier, event) => {
    return new Promise((resolve, reject) => {
        const headersAxios = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        };
    
        let messages = [];

        switch (event) {
            case 'follow':
                messages = followReplyTemplate(identifier);
                break;
            case 'unfollow':
                messages = unfollowReplyTemplate();
                break;
            case 'join_group':
                messages = joinGroupReplyTemplate(identifier);
                break;
            case 'add_member_to_group':
                messages = addMemberToGroupReplyTemplate(identifier);
                break;
            case 'remove_member_from_group':
                messages = removeMemberFromGroupReplyTemplate(identifier);
                break;
            case 'change_group_name':
                messages = changeGroupNameReplyTemplate(identifier);
                break;
            case 'change_group_description':
                messages = changeGroupDescriptionReplyTemplate();
                break;
            case 'list_added_user_in_group':
                messages = listAddedUserInGroupReplyTemplate(identifier);
                break;
            case 'reply_postback_job':
                messages = replyPostbackJobReplyTemplate(identifier);
                break;
            case 'final_join_postback':
                messages = finalJoinPostbackReplyTemplate();
                break;
            case 'add_user_button':
                messages = addUserButtonReplyTemplate(identifier);
                break;
            default:
                break;
        }

        const bodyAxios = {
            replyToken: replyToken,
            messages
        };
    
        axios({
            method: 'POST',
            url: 'https://api.line.me/v2/bot/message/reply',
            headers: headersAxios,
            data: bodyAxios
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

const sendPushMessage = (to, identifier, event) => {
    return new Promise((resolve, reject) => {
        const headersAxios = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`
        };
    
        let messages = [];

        switch (event) {
            case 'send_help_with_location':
                messages = sendHelpWithLocationReplyTemplate(identifier);
                break;
            case 'ask_for_sharing':
                messages = askForSharingReplyTemplate(identifier);
            default:
                break;
        }

        const bodyAxios = {
            to,
            messages
        };
    
        axios({
            method: 'POST',
            url: 'https://api.line.me/v2/bot/message/push',
            headers: headersAxios,
            data: bodyAxios
        })
        .then(() => {
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    getUserProfile,
    sendReplyMessage,
    sendPushMessage
};
