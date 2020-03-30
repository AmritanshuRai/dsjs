import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import questionReducer from './question/question.reducer';
import userReducer from './user/user.reducer';
import unisersalReducer from './universal/universal.reducer';
import editorReducer from './editor/editor.reducer';

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ["question"]
  blacklist: ['editor'],
  timeout: null,
};

const rootReducer = combineReducers({
  question: questionReducer,
  user: userReducer,
  universal: unisersalReducer,
  editor: editorReducer,
});

export default persistReducer(persistConfig, rootReducer);
