import {
    DELETE_PROJECT_TASK,
    GET_PROJECT_TASKS,
    GET_PROJECT_TASK,
    GET_PROJECT_TASK_COUNT,
    PROJECT_TASK_LOADING
} from "../actions/types";

const initialState = {
    project_tasks: [],
    project_task: {},
    isLoading: true
};

export default function(state = initialState, action) {
    switch (action.type) {

        case PROJECT_TASK_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case GET_PROJECT_TASKS:
            return {
                ...state,
                project_tasks: action.payload
            };

        case GET_PROJECT_TASK:
            return {
                ...state,
                project_task: action.payload
            };

        case GET_PROJECT_TASK_COUNT:
        return {
            ...state,
            project_task_count: action.payload
        };

        case DELETE_PROJECT_TASK:
            return {
                ...state,
                project_tasks: state.project_tasks.filter(project_task => project_task.id !== action.payload)
            };

        default:
            return state;
    }
}