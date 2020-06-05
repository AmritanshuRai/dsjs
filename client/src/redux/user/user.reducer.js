import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: '',
  showBtnSkeleton: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
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
