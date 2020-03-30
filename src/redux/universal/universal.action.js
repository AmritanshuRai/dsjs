export const toggleLoader = () => ({
  type: 'TOGGLE_LOADER',
});

export const toggleSearchField = () => ({
  type: 'TOGGLE_SEARCH_FIELD',
});
export const shouldFetchData = data => ({
  type: 'SHOULD_FETCH_DATA',
  payload: data,
});
