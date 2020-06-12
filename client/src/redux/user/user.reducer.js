import UserActionTypes from './user.types';
const INITIAL_STATE = {
  currentUser: null,
  error: '',
  showBtnSkeleton: false,
  currentLevel: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case UserActionTypes.SET_CURRENT_LEVEL:
      if (!state.currentUser) {
        return {
          ...state,
          currentLevel: null,
        };
      }
      const levelSelected = state.currentUser.yayNay[action.payload];
      return {
        ...state,
        currentLevel: levelSelected ? levelSelected.level : null,
        error: null,
      };
    case UserActionTypes.ADD_LEVEL_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          yayNay: {
            ...state.currentUser.yayNay,
            [action.payload.data.question]: {
              level: action.payload.data.level,
              id: action.payload.data._id,
            },
          },
        },
        currentLevel: action.payload.data.level,
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.EMAIL_VERIFICATION_FAILURE:
    case UserActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserActionTypes.SHOW_BTN_SKELETON:
      return {
        ...state,
        showBtnSkeleton: true,
      };
    case UserActionTypes.HIDE_BTN_SKELETON:
      return {
        ...state,
        showBtnSkeleton: false,
      };
    case UserActionTypes.EMAIL_VERIFICATION_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default userReducer;
