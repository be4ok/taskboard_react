import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import projectTaskReducer from "./projectTaskReducer";
import securityReducer from "./securityReducer";
import projectBoardReducer from "./projectBoardReducer";

export default combineReducers({
    validation: errorsReducer,
    board: projectBoardReducer,
    task: projectTaskReducer,
    security: securityReducer
});