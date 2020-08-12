import { createSlice, Draft } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getInitialFetchState } from './consts';
import { getFetchSelectors } from './selectors';
import { getFetchThunk, SliceConfig, SliceConfig2 } from './actions';

function createFetchSlice<P, A = void>(config: SliceConfig<P, A>): any;
function createFetchSlice<P, A, R>(config: SliceConfig2<P, A, R>): any;
function createFetchSlice<P, A, R>(config: any): any {
  const fetchThunk = getFetchThunk<P, A, R>(config);

  const { reducer, actions: sliceActions } = createSlice({
    name: config.domain,
    initialState: getInitialFetchState<P>(),
    reducers: {
      fetchReset: () => getInitialFetchState<null>(),
    },
    extraReducers: builder => {
      builder.addCase(fetchThunk.pending, (state): void => {
        state.isFetching = true;
        state.isFetched = false;
      });
      builder.addCase(fetchThunk.fulfilled, (state, action): void => {
        state.isFetching = false;
        state.isFetched = true;
        state.payload = action.payload as Draft<P>;
        state.error = null;
      });
      builder.addCase(fetchThunk.rejected, (state, action): void => {
        state.isFetching = false;
        state.isFetched = true;
        state.error = action.error;
      });
    },
  });

  const selectors = getFetchSelectors<P>(config.domain);
  const actions = {
    fetch,
    useFetch: () => {
      const dispatch = useDispatch();

      return (arg: A) => dispatch(fetchThunk(arg));
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
}

export { createFetchSlice };

// export const createFetchSlice = <P, A = void>(
//   config: Core.FetchSliceConfig<A, P>,
// ) => {
//   const fetchThunk = getFetchThunkWithOptionalHandler<A, P>(config);
//   const fetch = (payload: A, config: FetchHandlersOptional<P> = {}) =>
//     fetchThunk({ payload, ...config });
//
//   const { reducer, actions: sliceActions } = createSlice({
//     name: config.domain,
//     initialState: getInitialFetchState<P>(),
//     reducers: getFetchReducers<P>(),
//     extraReducers: getFetchExtraReducersOptional<A, P>(fetchThunk),
//   });
//
//   const selectors = getFetchSelectors<P>(config.domain);
//   const actions = {
//     fetch,
//     useFetch: () => {
//       const dispatch = useDispatch();
//
//       return (arg: A, config: FetchHandlersOptional<P> = {}) =>
//         dispatch(fetch(arg, config));
//     },
//     fetchPending: fetchThunk.pending,
//     fetchFulfilled: fetchThunk.fulfilled,
//     fetchRejected: fetchThunk.rejected,
//     ...sliceActions,
//   };
//
//   return {
//     reducer,
//     selectors,
//     actions,
//   };
// };
//
// export const createFetchHandlingSlice = <P, R, A = void>(
//   config: Core.FetchSliceConfig<A, R>,
// ) => {
//   const fetchThunk = getFetchThunkWithRequiredHandler<A, R, P>(config);
//   const fetch = (payload: A, config: FetchHandlersRequired<R, P>) =>
//     fetchThunk({ payload, ...config });
//
//   const { reducer, actions: sliceActions } = createSlice({
//     name: config.domain,
//     initialState: getInitialFetchState<P>(),
//     reducers: getFetchReducers<P>(),
//     extraReducers: getFetchExtraReducersRequired<A, R, P>(fetchThunk),
//   });
//
//   const selectors = getFetchSelectors<P>(config.domain);
//   const actions = {
//     fetch,
//     useFetch: () => {
//       const dispatch = useDispatch();
//
//       return (arg: A, config: FetchHandlersRequired<R, P>) =>
//         dispatch(fetch(arg, config));
//     },
//     fetchPending: fetchThunk.pending,
//     fetchFulfilled: fetchThunk.fulfilled,
//     fetchRejected: fetchThunk.rejected,
//     ...sliceActions,
//   };
//
//   return {
//     reducer,
//     selectors,
//     actions,
//   };
// };
