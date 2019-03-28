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
        await axios.get(`${PROXY_LINK}/api/users/activation/${activateCode}`);
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const updateUserEmail = newEmail => async dispatch => {
    try {
        dispatch(loading(true));

        await axios.put(`${PROXY_LINK}/api/users/profile/update/email?newEmail=${newEmail}`);
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

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post(`${PROXY_LINK}/api/users/login`, LoginRequest);
        const {token} = res.data;
        localStorage.setItem("jwtToken", token);
        setJWTToken(token);
        const decoded = jwt_decode(token);

        dispatch({
            type: SET_CURRENT_USER,
            payload: decoded
        });

    } catch (err) {
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        })
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWTToken(false);

    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });

};