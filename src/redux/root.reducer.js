import { combineReducers } from "redux";

import questionReducer from "./question/question.reducer";
import userReducer from "./user/user.reducer";
import unisersalReducer from "./universal/universal.reducer";

export default combineReducers({
    question: questionReducer,
    user: userReducer,
    universal: unisersalReducer
});
