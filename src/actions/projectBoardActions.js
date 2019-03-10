import axios from "axios";
import {GET_ERRORS, GET_PROJECT_BOARDS, DELETE_PROJECT_BOARD, GET_PROJECT_BOARD} from "./types";
import {PROXY_LINK} from "../proxy";

export const getProjectBoard = (pb_id, history) => async dispatch => {

    try {
        const res = await axios.get(`${PROXY_LINK}/api/boards/${pb_id}`);
        dispatch({
            type: GET_PROJECT_BOARD,
            payload: res.data
        });

        dispatch({
            type: GET_ERRORS,
            payload: {}
        })

    } catch (e) {
        history.push("/board")
    }
};

export const getProjectBoards = () => async dispatch => {
    const res = await axios.get(`${PROXY_LINK}/api/boards`);
    dispatch({
        type: GET_PROJECT_BOARDS,
        payload: res.data
    })
};

export const addProjectBoard = (project_board, history) => async dispatch => {
    try {
        await axios.post(`${PROXY_LINK}/api/boards`, project_board);
        history.push("/board");
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

export const updateProjectBoard = (project_board, history) => async dispatch => {
    try {
        await axios.put(`${PROXY_LINK}/api/boards`, project_board);
        history.push("/board");
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
