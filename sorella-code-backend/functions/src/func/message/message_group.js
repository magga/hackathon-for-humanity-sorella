const admin = require('firebase-admin');
const axios = require('axios');

const addMemberToGroup = require('./group/add_member_to_group');
const removeMemberFromGroup = require('./group/remove_member_from_group');
const changeGroupName = require('./group/change_group_name');
const changeGroupDescription = require('./group/change_group_description');
const resendKeyword = require('./group/resend_keyword');
const listAddedUserInGroup = require('./group/list_added_user_in_group');

const sendError = require('./../helper/send_error');

module.exports = (req, res) => {
    const { message } = req.body.events[0];
    const { type, text } = message;

    if (type.toLowerCase() != 'text') {
        return sendError(res, 'Message not recognized');
    }

    const arrWord = text.split(' ');

    if (arrWord.length < 2) {
        return sendError(res, 'Message not recognized');
    }

    let word = '';

    if (arrWord[2]) {
        word = `${arrWord[0]} ${arrWord[1]} ${arrWord[2]}`;
    } else {
        word = `${arrWord[0]} ${arrWord[1]}`;
    }

    console.log(word);

    switch (word.toLowerCase()) {
        case 'sorella add me':
            addMemberToGroup(req, res);
            break;
        case 'sorella remove me':
            removeMemberFromGroup(req, res);
            break;
        case 'sorella group name':
            changeGroupName(req, res);
            break;
        case 'sorella group description':
            changeGroupDescription(req, res);
            break;
        case 'sorella help':
            resendKeyword(req, res);
            break;
        case 'sorella status':
            listAddedUserInGroup(req, res);
            break;
        default:
            sendError(res, 'Message not recognized');
            break;
    }
};
