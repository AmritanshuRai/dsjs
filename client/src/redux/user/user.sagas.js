import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import SuccessMessage from '../../components/message/successMessage.component';
import FailureMessage from '../../components/message/failureMessage.component';
import UserActionTypes from './user.types';
import { toggleLoader } from '../universal/universal.action';
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
  auth,
  // googleProvider,
  createUserProfileDocument,
  // getCurrentUser,
} from '../../firebase/firebase.utils';

import {
  createUserWithEmailAndPassword,
  verifyEmail,
  signInWithEmailAndPassword,
  fetchCurrentUser,
  forgotPassword,
  resetPassword,
  sendGoogleToken,
} from '../../utils/auth';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    const displayName = yield !!userSnapshot.data().displayName
      ? userSnapshot.data().displayName
      : additionalData.displayName;
    const name = yield displayName.split(' ')[0];
    yield call(
      SuccessMessage,
      `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}`
    );
  } catch (error) {
    yield put(signInFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  }
}

export function* signInWithGoogle({ payload }) {
  try {
    yield put(toggleLoader(true));
    const data = yield sendGoogleToken(payload);
    yield console.warn('signInWithGoogleSAGA: ', data);
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

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    yield put(toggleLoader(true));
    const data = yield signInWithEmailAndPassword(email, password);
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
    yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
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
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    yield put(toggleLoader(true));
    const data = yield createUserWithEmailAndPassword(
      email,
      password,
      displayName
    );
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

// export function* signInAfterSignUp({ payload: { user, additionalData } }) {
//   try {
//     // yield getSnapshotFromUserAuth(user, additionalData);
//     yield call(SuccessMessage, `Please verify your email address`);
//   } catch (error) {
//     console.warn('signInAfterSignUp: ', error);
//     yield call(FailureMessage, error.message.split('.')[0]);
//   } finally {
//     yield put(toggleLoader(false));
//   }
// }

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
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
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
// export function* onSignUpSuccess() {
//   yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
// }

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onEmailVerificationStart),
    call(onForgotPasswordStart),
    call(onResetPasswordStart),
  ]);
}
