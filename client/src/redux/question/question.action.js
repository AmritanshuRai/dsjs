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

export const setCurrentPage = (data) => ({
  type: QuestionActionTypes.SET_CURRENT_PAGE,
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

export const postQuestion = (data) => ({
  type: QuestionActionTypes.POST_START,
  payload: data,
});

export const postSuccess = (data) => ({
  type: QuestionActionTypes.POST_SUCCESS,
  payload: data,
});

export const postFailure = (error) => ({
  type: QuestionActionTypes.POST_FAILURE,
  payload: error,
});
export const deletionStart = (data) => ({
  type: QuestionActionTypes.DELETION_START,
  payload: data,
});
export const deletionSuccess = () => ({
  type: QuestionActionTypes.DELETION_SUCCESS,
});

export const deleteFailure = (error) => ({
  type: QuestionActionTypes.DELETION_FAILURE,
  payload: error,
});

export const showSkeleton = () => ({
  type: QuestionActionTypes.SHOW_SKELETON,
});

export const hideSkeleton = () => ({
  type: QuestionActionTypes.HIDE_SKELETON,
});
