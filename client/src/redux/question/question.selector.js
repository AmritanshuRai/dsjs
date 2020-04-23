import { createSelector } from 'reselect';

const selectQuestion = (state) => state.question;

export const selectQuestionData = createSelector(
  [selectQuestion],
  (question) => question.question_data,
);

export const selectEveryQuestion = createSelector(
  [selectQuestion],
  (question) => question.EVERY_QUESTION,
);

export const selectFilteredText = createSelector(
  [selectQuestion],
  (question) => question.filteredText,
);

export const selectCurrentModule = createSelector(
  [selectQuestion],
  (question) => question.currentModule,
);

export const selectError = createSelector(
  [selectQuestion],
  (question) => question.error,
);
export const selectSkeletonLoading = createSelector(
  [selectQuestion],
  (question) => question.skeletonLoading,
);
