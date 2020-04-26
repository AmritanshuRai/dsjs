const INITIAL_DATA = {
  currentNav: 'home',
};

const navReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'SET_CURRENT_NAV':
      return {
        ...state,
        currentNav: action.payload,
      };

    default:
      return state;
  }
};

export default navReducer;
