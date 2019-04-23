import axios from "axios";
import {
    GET_ERRORS,
    GET_PROJECT_TASKS,
    DELETE_PROJECT_TASK,
    GET_PROJECT_TASK,
    GET_PROJECT_TASK_COUNT,
    PROJECT_TASK_LOADING
} from "./types";
import {PROXY_LINK} from "../proxy";

export function loading(isLoading) {
    return {
        type: PROJECT_TASK_LOADING,
        payload: isLoading
    };
}

export const cleanErrors = () => async dispatch => {
    dispatch({
        type: GET_ERRORS,
        payload: {}
    })
};

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

export const getProjectTasks = (pd_id, sorting) => async dispatch => {

    try {

        dispatch(loading(true));

        const res = await axios.get(`${PROXY_LINK}/api/boards/${pd_id}/tasks?sorting=${sorting}`);

        dispatch({
            type: GET_PROJECT_TASKS,
            payload: res.data
        });

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(loading(false));

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });

        dispatch(loading(false));
    }
};

export const searchProjectTasks = (pb_id, searchQuery, sorting) => async dispatch => {

    if (searchQuery.trim().length === 0) {
        dispatch(getProjectTasks(pb_id, sorting));
        return;
    }

    dispatch(loading(true));

    const res = await axios.get(`${PROXY_LINK}/api/boards/${pb_id}/tasks?search=${searchQuery}`);

    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    });

    dispatch(loading(false));
};

export const addProjectTask = (project_task, pb_id, sorting) => async dispatch => {
    try {
        await axios.post(
            `${PROXY_LINK}/api/boards/tasks`,
            project_task,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8'
                }
            }
        );

        dispatch({
            type: GET_ERRORS,
            payload: {}
        });

        dispatch(getProjectTasks(pb_id, sorting));

    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
};

export const updateProjectTask = (project_task, pb_id, sorting) => async dispatch => {
    try {
        await axios.put(
            `${PROXY_LINK}/api/boards/tasks`,
            project_task,
            {
                headers: {
                    'Content-type': 'application/json; charset=utf-8',
                    'Accept': 'application/json; charset=utf-8'
                }
            }
        );

        dispatch(getProjectTasks(pb_id, sorting));

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

export const start = (pt_id, pb_id, sorting) => async dispatch => {
    try {
        await axios.put(`${PROXY_LINK}/api/boards/tasks/${pt_id}/start`);

        dispatch(getProjectTasks(pb_id, sorting));

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

export const stop = (pt_id, pb_id, sorting) => async dispatch => {
    try {
        await axios.put(`${PROXY_LINK}/api/boards/tasks/${pt_id}/stop`);

        dispatch(getProjectTasks(pb_id, sorting));

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

export const finish = (pt_id, pb_id, sorting) => async dispatch => {
    try {
        await axios.put(`${PROXY_LINK}/api/boards/tasks/${pt_id}/finish`);

        dispatch(getProjectTasks(pb_id, sorting));

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