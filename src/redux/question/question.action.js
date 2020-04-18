import QuestionActionTypes from './question.types';

export const handleSearchChange = (value) => ({
  type: QuestionActionTypes.HANDLE_SEARCH_CHANGE,
  payload: value,
});

export const setQuestionData = (data) => ({
  type: QuestionActionTypes.SET_QUESTION_DATA,
  payload: data,
});

export const setCurrentModule = (data) => ({
  type: QuestionActionTypes.SET_CURRENT_MODULE,
  payload: data,
});

export const setQuestionDataAsync = (history) => ({
  type: QuestionActionTypes.FETCH_START,
  payload: history,
});

export const fetchFailure = (error) => ({
  type: QuestionActionTypes.FETCH_FAILURE,
  payload: error,
});
