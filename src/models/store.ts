import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import reducersMap from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducersMap,
  middleware: getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.DEVELOPMENT,
});

sagaMiddleware.run(rootSaga);

export default store;

export type State = ReturnType<typeof store.getState>;
