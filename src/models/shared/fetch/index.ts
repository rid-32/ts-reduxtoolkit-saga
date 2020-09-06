import { createSlice, Draft } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './consts';
import { getFetchSelectors } from './selectors';
import { getFetchThunk } from './actions';
import {
  SliceOptionalConfig,
  SliceRequiredConfig,
  CreateFetchSliceResponse,
} from './types';

function createFetchSlice<P, A = void>(
  config: SliceOptionalConfig<P, A>,
): CreateFetchSliceResponse<P, A>;
function createFetchSlice<P, A, R>(
  config: SliceRequiredConfig<P, A, R>,
): CreateFetchSliceResponse<P, A>;
function createFetchSlice<P, A, R>(config: any): any {
  const fetchThunk = getFetchThunk<P, A, R>(config);

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
      builder.addCase(fetchThunk.pending, (state): void => {
        state.status = 'PENDING';
      });
      builder.addCase(fetchThunk.fulfilled, (state, action): void => {
        state.status = 'SUCCESS';
        state.payload = action.payload as Draft<P>;
        state.error = null;
      });
      builder.addCase(fetchThunk.rejected, (state, action): void => {
        state.status = 'FAILURE';
        state.error = action.error;
      });
    },
  });

  const selectors = getFetchSelectors<P>(config.domain);
  const actions = {
    fetchThunk,
    useFetchThunk: () => {
      const dispatch = useDispatch();

      return (arg: A) => dispatch(fetchThunk(arg));
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
