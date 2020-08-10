import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './consts';
import { getFetchSelectors } from './selectors';
import {
  getFetchReducers,
  getFetchExtraReducersOptional,
  getFetchExtraReducersRequired,
} from './reducers';
import {
  getFetchThunkWithOptionalHandler,
  getFetchThunkWithRequiredHandler,
} from './actions';
import { FetchHandlersOptional, FetchHandlersRequired } from './types';

export const createFetchSlice = <P, A = void>(
  config: Core.FetchSliceConfig<A, P>,
) => {
  const fetchThunk = getFetchThunkWithOptionalHandler<A, P>(config);
  const fetch = (payload: A, config: FetchHandlersOptional<P> = {}) =>
    fetchThunk({ payload, ...config });

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: getInitialFetchState<P>(),
    reducers: getFetchReducers<P>(),
    extraReducers: getFetchExtraReducersOptional<A, P>(fetchThunk),
  });

  const selectors = getFetchSelectors<P>(config.domain);
  const actions = {
    fetch,
    useFetch: () => {
      const dispatch = useDispatch();

      return (arg: A, config: FetchHandlersOptional<P> = {}) =>
        dispatch(fetch(arg, config));
    },
    fetchPending: fetchThunk.pending,
    fetchFulfilled: fetchThunk.fulfilled,
    fetchRejected: fetchThunk.rejected,
    ...sliceActions,
  };

  return {
    reducer,
    selectors,
    actions,
  };
};

export const createFetchHandlingSlice = <P, R, A = void>(
  config: Core.FetchSliceConfig<A, R>,
) => {
  const fetchThunk = getFetchThunkWithRequiredHandler<A, R, P>(config);
  const fetch = (payload: A, config: FetchHandlersRequired<R, P>) =>
    fetchThunk({ payload, ...config });

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: getInitialFetchState<P>(),
    reducers: getFetchReducers<P>(),
    extraReducers: getFetchExtraReducersRequired<A, R, P>(fetchThunk),
  });

  const selectors = getFetchSelectors<P>(config.domain);
  const actions = {
    fetch,
    useFetch: () => {
      const dispatch = useDispatch();

      return (arg: A, config: FetchHandlersRequired<R, P>) =>
        dispatch(fetch(arg, config));
    },
    fetchPending: fetchThunk.pending,
    fetchFulfilled: fetchThunk.fulfilled,
    fetchRejected: fetchThunk.rejected,
    ...sliceActions,
  };

  return {
    reducer,
    selectors,
    actions,
  };
};
