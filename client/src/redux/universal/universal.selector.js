import { createSelector } from 'reselect';

const selectUniversal = (state) => state.universal;

export const selectToggleLoader = createSelector(
  [selectUniversal],
  (universal) => universal.loading
);

export const selectShowSearchField = createSelector(
  [selectUniversal],
  (universal) => universal.showSearchField
);
export const selectRenderSignIn = createSelector(
  [selectUniversal],
  (universal) => universal.renderSignIn
);
