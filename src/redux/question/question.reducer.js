// import { getQuestions } from "./question.api";
// const QUESTION_DATA = getQuestions();
// import QUESTION_DATA from "../question/question.data";

const INITIAL_DATA = {
  question_data: {},
  EVERY_QUESTION: {},
  filteredText: '',
};

const questionReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH_CHANGE':
      return {
        ...state,
        filteredText: action.payload,
        question_data: state.EVERY_QUESTION.filter(({ question }) => {
          return question.includes(action.payload);
        }),
      };
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        question_data: action.payload,
        EVERY_QUESTION: action.payload,
      };

    default:
      return state;
  }
};

export default questionReducer;
