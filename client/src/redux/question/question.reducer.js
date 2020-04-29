import QuestionActionTypes from './question.types';

const INITIAL_DATA = {
  question_data: {},
  EVERY_QUESTION: {},
  filteredText: '',
  currentModule: '',
  error: null,
  skeletonLoading: false,
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

    case QuestionActionTypes.FETCH_SUCCCESS:
      return {
        ...state,
        question_data: action.payload,
        EVERY_QUESTION: action.payload,
        error: null,
      };
    case QuestionActionTypes.DELETION_SUCCESS:
    case QuestionActionTypes.POST_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case QuestionActionTypes.SET_CURRENT_MODULE:
      return {
        ...state,
        currentModule: action.payload,
      };
    case QuestionActionTypes.POST_FAILURE:
    case QuestionActionTypes.FETCH_FAILURE:
    case QuestionActionTypes.DELETION_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case QuestionActionTypes.SHOW_SKELETON:
      return {
        ...state,
        skeletonLoading: true,
      };
    case QuestionActionTypes.HIDE_SKELETON:
      return {
        ...state,
        skeletonLoading: false,
      };
    default:
      return state;
  }
};

export default questionReducer;
