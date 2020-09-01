import { configureStore } from '@reduxjs/toolkit';

import reducersMap from './reducers';

const store = configureStore({
  reducer: reducersMap,
  devTools: process.env.DEVELOPMENT,
});

export default store;

export type State = ReturnType<typeof store.getState>;
