export const handleSearchChange = value => ({
  type: 'HANDLE_SEARCH_CHANGE',
  payload: value,
})

export const setQuestionData = data => ({
  type: 'SET_QUESTION_DATA',
  payload: data,
})

export const setTitleState = data => ({
  type: 'SET_TITLE_STATE',
  payload: data,
})
export const setSolutionState = data => ({
  type: 'SET_SOLUTION_STATE',
  payload: data,
})
export const setExplanationState = data => ({
  type: 'SET_EXPLANATION_STATE',
  payload: data,
})
