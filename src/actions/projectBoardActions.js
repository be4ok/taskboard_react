import axios from "axios";
import {
    GET_ERRORS,
    GET_PROJECT_BOARDS,
    DELETE_PROJECT_BOARD,
    GET_PROJECT_BOARD,
    PROJECT_BOARD_LOADING
} from "./types";
import {PROXY_LINK} from "../proxy";

export function loading(isLoading) {
    return {
        type: PROJECT_BOARD_LOADING,
        payload: isLoading
    };
}

export const cleanErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
};

export const getProjectBoard = (pb_id) => async dispatch => {

        const res = await axios.get(`${PROXY_LINK}/api/boards/${pb_id}`);
        dispatch({
            type: GET_PROJECT_BOARD,
            payload: res.data,
        });

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

};


export const getProjectBoards = () => async dispatch => {

    dispatch(loading(true));

    const res = await axios.get(`${PROXY_LINK}/api/boards`);

    dispatch({
        type: GET_PROJECT_BOARDS,
        payload: res.data,
    });

    dispatch(loading(false));
};

export const searchProjectBoards = (searchQuery, searchCriteria) => async dispatch => {

    if (searchQuery.trim().length === 0) {
        dispatch(getProjectBoards());
        return;
    }
    
    dispatch(loading(true));

    const res = await axios.get(`${PROXY_LINK}/api/boards?${searchCriteria}=${searchQuery}`);

    dispatch({
        type: GET_PROJECT_BOARDS,
        payload: res.data,
    });

    dispatch(loading(false));
};

export const addProjectBoard = (project_board) => async dispatch => {
    try {

        await axios.post(
            `${PROXY_LINK}/api/boards`,
            project_board,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8'
                }
            }
        );

        dispatch(getProjectBoards());

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const updateProjectBoard = (project_board) => async dispatch => {
    try {
        await axios.put(
            `${PROXY_LINK}/api/boards`,
            project_board,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8'
                }
            }
        );

        dispatch(getProjectBoards());

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const deleteProjectBoard = pb_id => async dispatch => {

    if (window.confirm(`Do you want to delete the board ID: ${pb_id} with all tasks inside? This action cannot be undone!`)) {
        await axios.delete(`${PROXY_LINK}/api/boards/${pb_id}`);
        dispatch({
            type: DELETE_PROJECT_BOARD,
            payload: pb_id
        })
    }
};
