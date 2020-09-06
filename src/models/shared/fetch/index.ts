import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './utils';
import { getFetchSelectors } from './selectors';
import { getFetchThunkWrapper } from './actions';
import {
  FetchSliceConfig,
  CreateFetchSliceResponseOptional,
  CreateFetchSliceResponseRequired,
} from './types';

function createFetchSlice<P, A = void>(
  config: FetchSliceConfig<P, A, P>,
): CreateFetchSliceResponseOptional<P, A>;
function createFetchSlice<P, A, R>(
  config: FetchSliceConfig<P, A, R>,
): CreateFetchSliceResponseRequired<P, A, R>;
function createFetchSlice<P, A, R>(config: any): any {
  const fetchThunk = getFetchThunkWrapper<P, A, R>(config);

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: {
      ...getInitialFetchState<P>(),
      ...(config.initialState || {}),
    },
    reducers: {
      resetFetch: () => getInitialFetchState<null>(),
    },
    extraReducers: builder => {
      builder.addCase(fetchThunk['pending'], (state): void => {
        state.status = 'PENDING';
      });
      builder.addCase(fetchThunk['fulfilled'], (state, action): void => {
        state.status = 'SUCCESS';
        state.payload = action.payload;
        state.error = null;
      });
      builder.addCase(fetchThunk['rejected'], (state, action): void => {
        state.status = 'FAILURE';
        state.error = action.error;
      });
    },
  });

  const selectors = getFetchSelectors<P>(config.domain);
  const actions = {
    fetchThunk: fetchThunk,
    useFetchThunk: () => {
      const dispatch = useDispatch();

      return (arg: A, config: any) => dispatch(fetchThunk(arg, config));
    },
    ...sliceActions,
  };

  return {
    reducer,
    selectors,
    actions,
  };
}

export { createFetchSlice };
