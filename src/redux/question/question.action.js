export const handleSearchChange = value => ({
    type: "HANDLE_SEARCH_CHANGE",
    payload: value
});

export const toggleSearchField = () => ({
    type: "TOGGLE_SEARCH_FIELD"
});

export const setQuestionData = data => ({
    type: "SET_QUESTION_DATA",
    payload: data
});
