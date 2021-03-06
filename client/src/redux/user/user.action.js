import UserActionTypes from './user.types';

export const googleSignInStart = (data) => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  payload: data,
});
export const githubSignInStart = (data) => ({
  type: UserActionTypes.GITHUB_SIGN_IN_START,
  payload: data,
});

export const facebookSignInStart = (data) => ({
  type: UserActionTypes.FACEBOOK_SIGN_IN_START,
  payload: data,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData },
});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
export const showBtnSkeleton = () => ({
  type: UserActionTypes.SHOW_BTN_SKELETON,
});
export const hideBtnSkeleton = () => ({
  type: UserActionTypes.HIDE_BTN_SKELETON,
});

export const emailVerificationStart = (tokenFromEmail) => ({
  type: UserActionTypes.EMAIL_VERIFICATION_START,
  payload: tokenFromEmail,
});

export const emailVerificationSuccess = (data) => ({
  type: UserActionTypes.EMAIL_VERIFICATION_SUCCESS,
  payload: data,
});

export const emailVerificationFailure = (data) => ({
  type: UserActionTypes.EMAIL_VERIFICATION_FAILURE,
  payload: data,
});

export const forgotPasswordStart = (data) => ({
  type: UserActionTypes.FORGOT_PASSWORD_START,
  payload: data,
});

export const resetPasswordStart = (data) => ({
  type: UserActionTypes.RESET_PASSWORD_START,
  payload: data,
});

export const resetPasswordFailure = (data) => ({
  type: UserActionTypes.RESET_PASSWORD_FAILURE,
  payload: data,
});

export const addLevelStart = (data) => ({
  type: UserActionTypes.ADD_LEVEL_START,
  payload: data,
});
export const updateLevelStart = (data) => ({
  type: UserActionTypes.UPDATE_LEVEL_START,
  payload: data,
});
export const setCurrentLevel = (data) => ({
  type: UserActionTypes.SET_CURRENT_LEVEL,
  payload: data,
});
export const addLevelSucces = (data) => ({
  type: UserActionTypes.ADD_LEVEL_SUCCESS,
  payload: data,
});
