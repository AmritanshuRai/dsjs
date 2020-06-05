import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import questionReducer from './question/question.reducer';
import userReducer from './user/user.reducer';
import unisersalReducer from './universal/universal.reducer';

import navReducer from './nav/nav.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["question"]
  blacklist: ['universal'],
};
const userPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['currentUser', 'showBtnSkeleton'],
};

const rootReducer = combineReducers({
  question: questionReducer,
  universal: unisersalReducer,
  user: persistReducer(userPersistConfig, userReducer),
  nav: navReducer,
});

export default persistReducer(persistConfig, rootReducer);
