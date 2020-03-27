import { EditorState } from 'draft-js'

const INITIAL_DATA = {
  question_data: {},
  EVERY_QUESTION: {},
  filteredText: '',
  titleState: EditorState.createEmpty(),
  solutionState: EditorState.createEmpty(),
  explanationState: EditorState.createEmpty(),
}

const questionReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH_CHANGE':
      return {
        ...state,
        filteredText: action.payload,
        question_data: state.EVERY_QUESTION.filter(({ question }) => {
          return question.includes(action.payload)
        }),
      }
    case 'SET_QUESTION_DATA':
      return {
        ...state,
        question_data: action.payload,
        EVERY_QUESTION: action.payload,
      }
    case 'SET_TITLE_STATE':
      return {
        ...state,
        titleState: action.payload,
      }
    case 'SET_SOLUTION_STATE':
      return {
        ...state,
        solutionState: action.payload,
      }
    case 'SET_EXPLANATION_STATE':
      return {
        ...state,
        explanationState: action.payload,
      }

    default:
      return state
  }
}

export default questionReducer
