import axios from "axios";
import {GET_ERRORS, SECURITY_LOADING, GET_CURRENT_USER} from "./types";
import {PROXY_LINK} from "../proxy";

export function loading(isLoading) {
    return {
        type: SECURITY_LOADING,
        payload: isLoading
    };
}

export const cleanErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
};


export const getUser = () => async dispatch => {
    const res = await axios.get(`${PROXY_LINK}/api/profile/user/`);
    dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
    });

    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
};

export const updateUser = user => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.put(`${PROXY_LINK}/api/profile/user/update`, user);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(loading(false));

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });

        dispatch(loading(false));
    }
};

export const updateUserEmail = newEmail => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.put(`${PROXY_LINK}/api/profile/user/email`, newEmail);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(loading(false));

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });

        dispatch(loading(false));
    }
};

export const updateUserPassword = changeUserPassword => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.put(`${PROXY_LINK}/api/profile/user/password`, changeUserPassword);

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(loading(false));

    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });

        dispatch(loading(false));
    }

};