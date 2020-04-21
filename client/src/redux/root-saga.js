import { all, call, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { userSagas } from './user/user.sagas';
import { questionSagas } from './question/question.sagas';

export default function* rootSaga() {
  yield take(REHYDRATE);
  yield all([call(userSagas), call(questionSagas)]);
}
