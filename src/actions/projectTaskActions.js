import axios from "axios";
import {GET_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK, GET_PROJECT_TASK_COUNT} from "./types";
import {PROXY_LINK} from "../proxy";


export const getProjectTask = pt_id => async dispatch => {
    const res = await axios.get(`${PROXY_LINK}/api/boards/tasks/${pt_id}`);
    dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
    });

    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
};

export const getProjectTasks = pd_id => async dispatch => {
    const res = await axios.get(`${PROXY_LINK}/api/boards/${pd_id}/tasks`);
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    })
};

export const addProjectTask = (project_task, pb_id, history) => async dispatch => {
    try {
        await axios.post(`${PROXY_LINK}/api/boards/tasks`, project_task);
        history.push(`/board/${pb_id}/taskboard`);
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

export const updateProjectTask = (project_task, pb_id, history) => async dispatch => {
    try {
        await axios.put(`${PROXY_LINK}/api/boards/tasks`, project_task);
        history.push(`/board/${pb_id}/taskboard`);
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

export const deleteProjectTask = pt_id => async dispatch => {

    if (window.confirm(`Do you want to delete the task ID: ${pt_id}? This action cannot be undone!`)) {
        await axios.delete(`${PROXY_LINK}/api/boards/tasks/${pt_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        })
    }
};

export const getProjectTaskCount = (pb_id) => async dispatch => {

    const res = await axios.get(`${PROXY_LINK}/api/boards/${pb_id}/count`);
    dispatch({
        type: GET_PROJECT_TASK_COUNT,
        payload: res.data
    });
};