import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { fetchData } from '../../utils/fetchData';
import { toggleLoader } from '../universal/universal.action';
import QuestionActionTypes from './question.types';
import { selectCurrentModule } from './question.selector';
import { setQuestionData, fetchFailure } from './question.action';

export function* fetchQuestions(action) {
  const collectionName = yield select(selectCurrentModule);
  try {
    yield put(toggleLoader(true));
    const fetchedData = yield fetchData(collectionName);
    yield put(setQuestionData(fetchedData));
  } catch (error) {
    yield put(fetchFailure(error));

    yield collectionName === 'pendingQuestions'
      ? action.payload.push('/')
      : null;
  } finally {
    yield put(toggleLoader(false));
  }
}
export function* onFetchQuestions() {
  yield takeLatest(QuestionActionTypes.FETCH_START, fetchQuestions);
}

export function* questionSagas() {
  yield all([call(onFetchQuestions)]);
}
