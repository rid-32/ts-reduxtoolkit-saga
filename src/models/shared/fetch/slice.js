import { createSlice } from '@reduxjs/toolkit';

import { getFetchSelectors } from './selectors';
import { getFetchThunkWrapper, getFetchActions } from './actions';
import { INITIAL_FETCH_STATE } from './consts';
import { getFetchReducers, getFetchExtraReducers } from './reducers';

export const createFetchSlice = config => {
  const fetchThunk = getFetchThunkWrapper(config);

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: {
      ...INITIAL_FETCH_STATE,
      ...(config.initialState || {}),
    },
    reducers: getFetchReducers(),
    extraReducers: getFetchExtraReducers(fetchThunk),
  });

  const selectors = getFetchSelectors(config.domain);
  const actions = getFetchActions(sliceActions, fetchThunk);

  return {
    reducer,
    selectors,
    actions,
  };
};
