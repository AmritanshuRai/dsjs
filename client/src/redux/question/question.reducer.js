import QuestionActionTypes from './question.types';

const INITIAL_DATA = {
  question_data: {},
  pending_data: {},
  // EVERY_QUESTION: {},
  filteredText: '',
  currentModule: '',
  currentPage: 1,
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
      let objType =
        state.currentModule === 'questions' ? 'question_data' : 'pending_data';

      return {
        ...state,
        [objType]: action.payload.questions,
        totalQueryCount: action.payload.totalQueryCount,
        // EVERY_QUESTION: action.payload,
        error: null,
      };
    case QuestionActionTypes.DELETION_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case QuestionActionTypes.POST_SUCCESS:
      return {
        ...state,
        error: null,
      };
    // if (state.currentModule === 'questions') {
    //   return {
    //     ...state,
    //     error: null,
    //   };
    // }

    // const {
    //   id,
    //   title,
    //   description,
    //   explanation,
    //   solution,
    //   timestamp,
    // } = action.payload;
    // let newQuestion = {};
    // newQuestion[id] = {
    //   title,
    //   description,
    //   explanation,
    //   solution,
    //   timestamp,
    // };
    // return {
    //   ...state,
    //   question_data: {
    //     ...newQuestion,
    //     ...state.question_data,
    //   },

    //   error: null,
    // };
    case QuestionActionTypes.SET_CURRENT_MODULE:
      return {
        ...state,
        currentModule: action.payload,
      };
    case QuestionActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
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
