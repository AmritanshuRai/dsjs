import { combineReducers } from "redux";

import questionReducer from "./question/question.reducer";
import userReducer from "./user/user.reducer";

export default combineReducers({
    question: questionReducer,
    user: userReducer
});
