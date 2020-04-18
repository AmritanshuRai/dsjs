import QuestionActionTypes from './question.types';
const INITIAL_DATA = {
  question_data: {},
  EVERY_QUESTION: {},
  filteredText: '',
  currentModule: '',
  error: null,
};

const questionReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case QuestionActionTypes.HANDLE_SEARCH_CHANGE:
      return {
        ...state,
        filteredText: action.payload,
        question_data: state.EVERY_QUESTION.filter(({ question }) => {
          return question.includes(action.payload);
        }),
      };

    case QuestionActionTypes.SET_QUESTION_DATA:
      return {
        ...state,
        question_data: action.payload,
        EVERY_QUESTION: action.payload,
        error: null,
      };
    case QuestionActionTypes.SET_CURRENT_MODULE:
      return {
        ...state,
        currentModule: action.payload,
      };
    case QuestionActionTypes.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
