import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getFetchSelectors } from './selectors';
import { getFetchThunkWrapper } from './actions';
import { INITIAL_FETCH_STATE } from './consts';

export const createFetchSlice = config => {
  const fetchThunk = getFetchThunkWrapper(config);

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: {
      ...INITIAL_FETCH_STATE,
      ...(config.initialState || {}),
    },
    reducers: {
      resetFetch: state => {
        state.status = INITIAL_FETCH_STATE.status;
        state.payload = INITIAL_FETCH_STATE.payload;
        state.error = INITIAL_FETCH_STATE.error;
      },
      fetchSaga: (state, action) => {
        /* creating an action for corresponding saga  */
      },
    },
    extraReducers: builder => {
      builder.addCase(fetchThunk.pending, state => {
        state.status = 'PENDING';
      });
      builder.addCase(fetchThunk.fulfilled, (state, action) => {
        state.status = 'SUCCESS';
        state.payload = action.payload;
        state.error = null;
      });
      builder.addCase(fetchThunk.rejected, (state, action) => {
        state.status = 'FAILURE';
        state.error = action.error;
      });
    },
  });

  const selectors = getFetchSelectors(config.domain);
  const actions = {
    fetchThunk,
    useFetchThunk: () => {
      const dispatch = useDispatch();

      return (payload, config) => dispatch(fetchThunk(payload, config));
    },
    useResetFetch: () => {
      const dispatch = useDispatch();

      return () => dispatch(sliceActions.resetFetch());
    },
    ...sliceActions,
    useFetchSaga: () => {
      const dispatch = useDispatch();

      return payload => dispatch(sliceActions.fetchSaga(payload));
    },
  };

  return {
    reducer,
    selectors,
    actions,
  };
};
