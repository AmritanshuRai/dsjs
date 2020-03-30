import { EditorState } from 'draft-js';

const INITIAL_DATA = {
  titleState: EditorState.createEmpty(),
  solutionState: EditorState.createEmpty(),
  explanationState: EditorState.createEmpty(),
};

const editorReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'SET_TITLE_STATE':
      return {
        ...state,
        titleState: action.payload,
      };
    case 'SET_SOLUTION_STATE':
      return {
        ...state,
        solutionState: action.payload,
      };
    case 'SET_EXPLANATION_STATE':
      return {
        ...state,
        explanationState: action.payload,
      };

    default:
      return state;
  }
};

export default editorReducer;
