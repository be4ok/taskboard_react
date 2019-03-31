import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER, SECURITY_LOADING} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
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

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.post(`${PROXY_LINK}/api/users/register`, newUser);
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

export const activateUser = activateCode => async dispatch => {
    try {

        dispatch(loading(true));

        await axios.get(`${PROXY_LINK}/api/users/activation/${activateCode}`);
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

        await axios.put(`${PROXY_LINK}/api/users/profile/update/email`, newEmail);
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

        await axios.put(`${PROXY_LINK}/api/users/profile/update/password`, changeUserPassword);

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

export const resetForgottenPassword = email => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.put(`${PROXY_LINK}/api/users/password/reset?email=${email}`);

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

export const setForgottenPassword = (code, newUserPassword) => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.post(`${PROXY_LINK}/api/users/password/set-new/${code}`, newUserPassword);

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

export const login = (LoginRequest, isRememberMe) => async dispatch => {
    try {

        dispatch(loading(true));

        const res = await axios.post(`${PROXY_LINK}/api/users/login`, LoginRequest);
        const {token} = res.data;


        if (isRememberMe) {
            localStorage.setItem("taskBoardJwt", token);
        } else sessionStorage.setItem("taskBoardJwt", token);


        setJWTToken(token);
        const decoded = jwt_decode(token);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });

        dispatch(loading(false));

    } catch (err) {
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });

        dispatch(loading(false));
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("taskBoardJwt");
    sessionStorage.removeItem("taskBoardJwt");
    setJWTToken(false);

    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });

};