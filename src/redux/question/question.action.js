export const handleSearchChange = value => ({
  type: 'HANDLE_SEARCH_CHANGE',
  payload: value,
});

export const setQuestionData = data => ({
  type: 'SET_QUESTION_DATA',
  payload: data,
});

export const setCurrentModule = data => ({
  type: 'SET_CURRENT_MODULE',
  payload: data,
});
