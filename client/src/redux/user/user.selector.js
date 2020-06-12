import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
export const selectShowBtnSkeleton = createSelector(
  [selectUser],
  (user) => user.showBtnSkeleton
);
export const selectCurrentLevel = createSelector(
  [selectUser],
  (user) => user.currentLevel
);
export const selectError = createSelector([selectUser], (user) => user.error);
