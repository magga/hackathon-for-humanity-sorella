import { REHYDRATE } from 'redux-persist/constants';

import {
    SAVE_USER, LOG_OUT
} from './../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REHYDRATE: 
            return action.payload.user || INITIAL_STATE;
        case SAVE_USER:
            return action.payload;
        case LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};
