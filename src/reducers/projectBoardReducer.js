import {
    DELETE_PROJECT_BOARD,
    GET_PROJECT_BOARDS,
    GET_PROJECT_BOARD,
    PROJECT_BOARD_LOADING
} from "../actions/types";

const initialState = {
    project_boards: [],
    project_board: {},
    isLoading: true
};

export default function (state = initialState, action) {
    switch (action.type) {


        case PROJECT_BOARD_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };

        case GET_PROJECT_BOARDS:
            return {
                ...state,
                project_boards: action.payload
            };

        case GET_PROJECT_BOARD:
            return {
                ...state,
                project_board: action.payload
            };

        case DELETE_PROJECT_BOARD:
            return {
                ...state,
                project_boards: state.project_boards.filter(project_board => project_board.id !== action.payload)
            };

        default:
            return state;
    }
}