import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './utils';
import { getFetchSelectors } from './selectors';
import { getFetchThunkWrapper } from './actions';
import { FetchState, FetchSliceConfig, ApiMethodExtend } from './types';
function createFetchSlice<P, AM extends ApiMethodExtend>(
  config: FetchSliceConfig<P, AM>,
) {
  const { fetchThunk, fetchThunkWrapper } = getFetchThunkWrapper<P, AM>(config);

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: {
      ...getInitialFetchState(),
      ...(config.initialState || {}),
    },
    reducers: {
      resetFetch: (state: FetchState<Draft<P>>) => {
        const { status, payload, error } = getInitialFetchState();

        state.status = status;
        state.payload = payload;
        state.error = error;
      },
      fetchSaga: (
        state: FetchState<Draft<P>>, // eslint-disable-line
        action: PayloadAction<any>, // eslint-disable-line
      ) => {
        /* creating an action for corresponding saga  */
      },
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
    fetchThunk: fetchThunkWrapper,
    // useFetchThunk: () => {
    //   const dispatch = useDispatch();
    //
    //   return (arg: A, config: any) => dispatch(fetchThunk(arg, config));
    // },
    ...sliceActions,
    // useFetchSaga: () => {
    //   const dispatch = useDispatch();
    //
    //   return (arg: A) => dispatch(sliceActions.fetchSaga(arg));
    // },
  };

  return {
    reducer,
    selectors,
    actions,
  };
}

export { createFetchSlice };
