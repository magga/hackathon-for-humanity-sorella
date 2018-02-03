import firebase from 'firebase';

import {
    SAVE_USER, LOG_OUT
} from './types';

export const saveUser = (user) => {
    return ({
        type: SAVE_USER,
        payload: user
    });
};

export const logOut = (backToMain) => {    
    return (dispatch) => {
        firebase.auth().signOut().then(() => {
            dispatch({
                type: LOG_OUT
            });

            backToMain();
        });
    };
};
