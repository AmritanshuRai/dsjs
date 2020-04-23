import { takeLatest, put, all, call } from 'redux-saga/effects';
import SuccessMessage from '../../components/message/successMessage.component';
import FailureMessage from '../../components/message/failureMessage.component';
import UserActionTypes from './user.types';
import { toggleLoader } from '../universal/universal.action';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  showBtnSkeleton,
  hideBtnSkeleton,
} from './user.action';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData,
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));

    const name = yield userSnapshot.data().displayName.split(' ')[0];
    yield call(
      SuccessMessage,
      `Hi, ${name.charAt(0).toUpperCase() + name.slice(1)}`,
    );
  } catch (error) {
    yield put(signInFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  }
}

export function* signInWithGoogle() {
  try {
    yield put(toggleLoader(true));
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
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
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* isUserAuthenticated() {
  try {
    yield put(showBtnSkeleton());
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);
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
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
    yield call(FailureMessage, error.message.split('.')[0]);
    yield put(toggleLoader(false));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  try {
    yield getSnapshotFromUserAuth(user, additionalData);
  } catch (error) {
    yield call(FailureMessage, error.message.split('.')[0]);
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

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ]);
}
