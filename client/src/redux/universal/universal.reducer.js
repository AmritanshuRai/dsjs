const INITIAL_DATA = {
  loading: false,
  showSearchField: true,
  renderSignIn: true,
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
    case 'TOGGLE_RENDER_SIGNIN':
      return {
        ...state,
        renderSignIn: !state.renderSignIn,
      };
    default:
      return state;
  }
};

export default universalReducer;
