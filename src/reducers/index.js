import { combineReducers } from "redux";
import errorsReducer from "./errorsReducer";
import projectTaskReducer from "./projectTaskReducer";
import securityReducer from "./securityReducer";
import projectBoardReducer from "./projectBoardReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    errors: errorsReducer,
    board: projectBoardReducer,
    task: projectTaskReducer,
    security: securityReducer,
    profile: profileReducer
});