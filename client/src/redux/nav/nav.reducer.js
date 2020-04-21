const INITIAL_DATA = {
  currentNav: 'home',
  drawerVisible: false,
};

const navReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case 'SET_CURRENT_NAV':
      return {
        ...state,
        currentNav: action.payload,
      };
    case 'SET_DRAWER_VISIBLE':
      return {
        ...state,
        drawerVisible: action.payload,
      };

    default:
      return state;
  }
};

export default navReducer;
