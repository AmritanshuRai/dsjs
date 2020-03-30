import { createSelector } from 'reselect';

const selectEditor = state => state.editor;

export const selectTitleState = createSelector(
  [selectEditor],
  editor => editor.titleState,
);

export const selectSolutionState = createSelector(
  [selectEditor],
  editor => editor.solutionState,
);

export const selectExplanationState = createSelector(
  [selectEditor],
  editor => editor.explanationState,
);
