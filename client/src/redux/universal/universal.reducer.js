const INITIAL_DATA = {
  loading: false,
  showSearchField: true,
};

const universalReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'TOGGLE_LOADER':
      return {
        ...state,
        loading: action.payload,
      };
    case 'TOGGLE_SEARCH_FIELD':
      return {
        ...state,
        showSearchField: !state.showSearchField,
      };

    default:
      return state;
  }
};

export default universalReducer;