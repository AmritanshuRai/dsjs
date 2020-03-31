export const toggleLoader = data => ({
  type: 'TOGGLE_LOADER',
  payload: data,
});

export const toggleSearchField = () => ({
  type: 'TOGGLE_SEARCH_FIELD',
});
export const shouldFetchData = data => ({
  type: 'SHOULD_FETCH_DATA',
  payload: data,
});
