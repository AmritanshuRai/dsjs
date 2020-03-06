import QUESTION_DATA from "./question.data";

const INITIAL_DATA = {
    question_data : QUESTION_DATA,
    filteredText : "",
    showSearchField : true
}

const questionReducer = (state = INITIAL_DATA, action) => {
    switch(action.type) {
        case 'HANDLE_SEARCH_CHANGE':
            return {
                ...state,
                filteredText : action.payload,
                question_data : QUESTION_DATA.filter(({question})=>{
                    return question.includes(action.payload);
                })
            }
        case 'TOGGLE_SEARCH_FIELD':
            return {
                ...state,
                showSearchField : !state.showSearchField
            }
        default :
        return state;
    }
}

export default questionReducer;