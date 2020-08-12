import { configureStore } from '@reduxjs/toolkit';

import reducersMap from './reducers';

const store = configureStore({
  reducer: reducersMap,
  devTools: process.env.DEVELOPMENT,
});

export default store;

export type State = ReturnType<typeof store.getState>;

// import { createStore, applyMiddleware, Store as ReduxStore } from 'redux';
// import createSagaMiddleware from 'redux-saga';
// import { composeWithDevTools } from 'redux-devtools-extension';
//
// import reducers from './reducers';
// import sagas from './sagas';
//
// const sagaMiddleware = createSagaMiddleware();
//
// const middlewares = applyMiddleware(sagaMiddleware);
//
// const enhancers = process.env.DEVELOPMENT
//   ? composeWithDevTools(middlewares)
//   : middlewares;
//
// const store: ReduxStore<Store.State> = createStore(reducers, enhancers);
//
// sagas.forEach(saga => sagaMiddleware.run(saga));
//
// export default store;
