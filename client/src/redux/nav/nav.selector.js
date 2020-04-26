import { createSelector } from 'reselect';

const selectNav = (state) => state.nav;

export const selectCurrentNav = createSelector(
  [selectNav],
  (nav) => nav.currentNav,
);
