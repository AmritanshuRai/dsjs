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
  timeout: null,
};

const rootReducer = combineReducers({
  question: questionReducer,
  user: userReducer,
  universal: unisersalReducer,

  nav: navReducer,
});

export default persistReducer(persistConfig, rootReducer);
