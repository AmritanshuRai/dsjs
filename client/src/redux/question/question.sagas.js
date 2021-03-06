import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { fetchData } from '../../utils/fetchData';
import { postData } from '../../utils/postData';
import { deleteData } from '../../utils/deleteData';
import { toggleLoader } from '../universal/universal.action';
import QuestionActionTypes from './question.types';
import { selectCurrentModule, selectQuestionData } from './question.selector';
import { selectCurrentUser } from '../user/user.selector';
import FailureMessage from '../../components/message/failureMessage.component';
import {
  fetchSuccess,
  fetchFailure,
  postFailure,
  postSuccess,
  deletionSuccess,
  deleteFailure,
  showSkeleton,
  hideSkeleton,
} from './question.action';

export function* fetchQuestions(action) {
  const collectionName = yield select(selectCurrentModule);
  const questions = yield select(selectQuestionData);

  // show skeleton if localStorage is empty
  if (!Object.keys(questions).length) {
    yield put(showSkeleton());
  }
  try {
    const fetchedData = yield fetchData(collectionName, action.payload);
    yield put(fetchSuccess(fetchedData));
  } catch (error) {
    yield put(fetchFailure(error));
    yield collectionName === 'pendingQuestions'
      ? action.payload.push('/')
      : action.payload.push('/404');
  } finally {
    yield put(hideSkeleton());
  }
}
export function* onFetchQuestions() {
  yield takeLatest(QuestionActionTypes.FETCH_START, fetchQuestions);
}

export function* postQuestion({
  payload: { afterSuccessCallback, finalData },
}) {
  try {
    yield put(toggleLoader(true));
    const currentUser = yield select(selectCurrentUser);
    if (!currentUser || !currentUser.token) {
      throw new Error('Please sign in');
    }
    const value = yield call(
      postData,
      finalData,
      JSON.parse(localStorage.getItem('id')),
      currentUser.token
    );
    yield put(postSuccess(value));
    yield call(afterSuccessCallback, value);
  } catch (error) {
    yield put(postFailure(error));
    yield call(FailureMessage, error.message);
  } finally {
    yield put(toggleLoader(false));
  }
}
export function* onPostQuestion() {
  yield takeLatest(QuestionActionTypes.POST_START, postQuestion);
}

export function* deleteQuestion({ payload: { afterSuccessCallback, id } }) {
  try {
    yield put(toggleLoader(true));
    yield call(deleteData, id);
    yield put(deletionSuccess());
    yield call(afterSuccessCallback);
  } catch (error) {
    yield put(deleteFailure(error));
  } finally {
    yield put(toggleLoader(false));
  }
}

export function* onDelete() {
  yield takeLatest(QuestionActionTypes.DELETION_START, deleteQuestion);
}

export function* questionSagas() {
  yield all([call(onFetchQuestions), call(onPostQuestion), call(onDelete)]);
}
