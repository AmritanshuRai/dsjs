import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import SuccessMessage from '../../components/message/successMessage.component';
import FailureMessage from '../../components/message/failureMessage.component';
import UserActionTypes from './user.types';
import { toggleLoader } from '../universal/universal.action';
import { postLevel } from '../../utils/postLevel.util';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  // signUpSuccess,
  signUpFailure,
  showBtnSkeleton,
  hideBtnSkeleton,
  emailVerificationSuccess,
  emailVerificationFailure,
  resetPasswordFailure,
} from './user.action';
import { selectCurrentUser } from './user.selector';

import {
  verifyEmail,
  signInWithEmailAndPassword,
  fetchCurrentUser,
  forgotPassword,
  resetPassword,
  sendGoogleToken,
  sendFacebookToken,
  sendGithubCode,
  createUser,
} from '../../utils/auth';

export function* socialLogin(func, payload) {
  try {
    yield put(toggleLoader(true));
    const data = yield func(payload);
    if (!data.success) {
      throw new Error(data.error);
    }
    const fetchedData = data.data;
    yield put(signInSuccess(fetchedData));
    const name = yield fetchedData.displayName.split(' ')[0];
    yield call(
      SuccessMessage,
      `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}`
    );
  } catch (error) {
    yield put(signInFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* signInWithGithub({ payload }) {
  yield call(socialLogin, sendGithubCode, payload);
}

export function* signInWithGoogle({ payload }) {
  yield call(socialLogin, sendGoogleToken, payload);
}
export function* signInWithFacebook({ payload }) {
  yield call(socialLogin, sendFacebookToken, payload);
}

export function* signInWithEmail({ payload }) {
  yield call(socialLogin, signInWithEmailAndPassword, payload);
}

export function* isUserAuthenticated() {
  try {
    yield put(showBtnSkeleton());
    const currentUser = yield select(selectCurrentUser);
    if (!currentUser || !currentUser.token) return;
    const fetchedUser = yield call(fetchCurrentUser, currentUser.token);
    if (!fetchedUser.success) {
      yield put(signOutSuccess());
      return;
    }
    const fetchedData = fetchedUser.data;
    yield put(signInSuccess(fetchedData));
    const name = yield fetchedData.displayName.split(' ')[0];
    yield call(
      SuccessMessage,
      `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}`
    );
  } catch (error) {
    yield put(signInFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  } finally {
    yield put(hideBtnSkeleton());
  }
}

export function* signOut() {
  try {
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    yield put(toggleLoader(true));
    const data = yield call(createUser, email, password, displayName);
    // const data = yield createUser(email, password, displayName);
    if (!data.success) {
      throw new Error(data.error);
    }
    yield call(SuccessMessage, `Please verify your email address`);
  } catch (error) {
    console.error('signUp: ', error);
    yield put(signUpFailure(error));
    yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* emailVerificationStart({ payload }) {
  yield put(toggleLoader(true));
  try {
    const data = yield call(verifyEmail, payload);
    if (!data.success) {
      throw new Error(data.error);
    }
    const fetchedData = data.data;
    yield put(emailVerificationSuccess(fetchedData));
    const name = yield fetchedData.displayName.split(' ')[0];
    yield call(
      SuccessMessage,
      `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}`
    );
  } catch (error) {
    console.warn(error);
    yield put(emailVerificationFailure(error.message));

    // yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* forgotPasswordStart({ payload }) {
  yield put(toggleLoader(true));
  try {
    const data = yield call(forgotPassword, payload);
    if (!data.success) {
      throw new Error(data.error);
    }
    yield call(SuccessMessage, `Please check your email`);
  } catch (error) {
    console.error(error);
    // yield put(emailVerificationFailure(error.message));
    yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* resetPasswordStart({ payload }) {
  try {
    yield put(toggleLoader(true));
    const data = yield call(resetPassword, payload);
    if (!data.success) {
      throw new Error(data.error);
    }
    const fetchedData = data.data;
    yield put(signInSuccess(fetchedData));
    yield call(payload.afterSuccessCallback);
    yield call(SuccessMessage, `Password updated`);
  } catch (error) {
    console.warn(error);
    yield put(resetPasswordFailure(error.message));
    yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* addLevel({ payload }) {
  try {
    const currentUser = yield select(selectCurrentUser);
    if (!currentUser || !currentUser.token) {
      throw new Error('Please sign in');
    }
    console.log('payload, currentUser.token: ', payload, currentUser.token);
    const data = yield call(postLevel, payload, currentUser.token);

    if (!data.success) {
      throw new Error(data.error);
    }
    yield call(SuccessMessage, `Thanks for voting!`);
    // yield put(deletionSuccess());

    // yield call(afterSuccessCallback);
  } catch (error) {
    // yield put(deleteFailure(error));
    yield call(FailureMessage, 'Not able to vote');
  } finally {
  }
}

export function* onAddLevelStart() {
  yield takeLatest(UserActionTypes.ADD_LEVEL_START, addLevel);
}
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onFacebookSignInStart() {
  yield takeLatest(UserActionTypes.FACEBOOK_SIGN_IN_START, signInWithFacebook);
}
export function* onGithubSignInStart() {
  yield takeLatest(UserActionTypes.GITHUB_SIGN_IN_START, signInWithGithub);
}
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onEmailVerificationStart() {
  yield takeLatest(
    UserActionTypes.EMAIL_VERIFICATION_START,
    emailVerificationStart
  );
}

export function* onForgotPasswordStart() {
  yield takeLatest(UserActionTypes.FORGOT_PASSWORD_START, forgotPasswordStart);
}

export function* onResetPasswordStart() {
  yield takeLatest(UserActionTypes.RESET_PASSWORD_START, resetPasswordStart);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onFacebookSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onEmailVerificationStart),
    call(onForgotPasswordStart),
    call(onResetPasswordStart),
    call(onGithubSignInStart),
    call(onAddLevelStart),
  ]);
}
