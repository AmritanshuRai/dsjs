import QuestionActionTypes from './question.types';

export const handleSearchChange = (value) => ({
  type: QuestionActionTypes.HANDLE_SEARCH_CHANGE,
  payload: value,
});

export const fetchSuccess = (data) => ({
  type: QuestionActionTypes.FETCH_SUCCCESS,
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
