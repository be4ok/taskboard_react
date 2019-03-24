import {SET_CURRENT_USER, SECURITY_LOADING} from "../actions/types";

const initialState = {
    user: {},
    validToken: false,
    isLoading: false
};

const booleanActionPayload = payload => {
    if (payload && Object.keys(payload).length) {
        return true;
    } else {
        return false;
    }
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SECURITY_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case SET_CURRENT_USER:
            return{
                ...state,
                validToken: booleanActionPayload(action.payload),
                user: action.payload
            };

        default: return state;
    }
}