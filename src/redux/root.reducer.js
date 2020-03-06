import { combineReducers } from 'redux';


import questionReducer from './question/question.reducer';

export default combineReducers({
    question: questionReducer
});

