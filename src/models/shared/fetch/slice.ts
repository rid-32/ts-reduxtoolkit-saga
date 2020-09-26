import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './utils';
import { getFetchSelectors } from './selectors';
import { getFetchThunkWrapper } from './actions';
import {
  FetchState,
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
      resetFetch: (state: FetchState<P>) => {
        const { status, payload, error } = getInitialFetchState<null>();
        state.status = status;
        state.payload = payload;
        state.error = error;
      },
      /* eslint-disable-next-line */
      fetchSaga: (state: FetchState<P>, action: PayloadAction<A>) => {
        /* creating an action for corresponding saga  */
      },
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
    fetchThunk,
    useFetchThunk: () => {
      const dispatch = useDispatch();

      return (arg: A, config: any) => dispatch(fetchThunk(arg, config));
    },
    ...sliceActions,
    useFetchSaga: () => {
      const dispatch = useDispatch();

      return (arg: A) => dispatch(sliceActions.fetchSaga(arg));
    },
  };

  return {
    reducer,
    selectors,
    actions,
  };
}

export { createFetchSlice };
