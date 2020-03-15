import { createSelector } from "reselect";

const selectUniversal = state => state.universal;

export const selectToggleLoader = createSelector(
    [selectUniversal],
    universal => universal.loading
);
