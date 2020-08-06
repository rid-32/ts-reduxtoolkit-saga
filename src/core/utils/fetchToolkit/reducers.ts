import {
  SliceCaseReducers,
  ActionReducerMapBuilder,
  AsyncThunk,
  Draft,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';

import * as CONSTS from './consts';

type FetchOptional<A, P> = AsyncThunk<
  P,
  Core.FetchConfigOptional<A, P, ThunkDispatch<unknown, unknown, AnyAction>>,
  {}
>;

type FetchRequired<A, R, P> = AsyncThunk<
  P,
  Core.FetchConfigRequired<A, R, P, ThunkDispatch<unknown, unknown, AnyAction>>,
  {}
>;

export const getFetchExtraReducersOptional = <A, P>(
  fetch: FetchOptional<A, P>,
) => (builder: ActionReducerMapBuilder<Core.FetchState<P>>): void => {
  builder.addCase(fetch.pending, (state): void => {
    state.isFetching = true;
    state.isFetched = false;
  });
  builder.addCase(fetch.fulfilled, (state, action): void => {
    state.isFetching = false;
    state.isFetched = true;
    state.payload = action.payload as Draft<P>;
    state.error = null;
  });
  builder.addCase(fetch.rejected, (state, action): void => {
    state.isFetching = false;
    state.isFetched = true;
    state.error = action.payload as object;
  });
};

export const getFetchExtraReducersRequired = <A, R, P>(
  fetch: FetchRequired<A, R, P>,
) => (builder: ActionReducerMapBuilder<Core.FetchState<P>>): void => {
  builder.addCase(fetch.pending, (state): void => {
    state.isFetching = true;
    state.isFetched = false;
  });
  builder.addCase(fetch.fulfilled, (state, action): void => {
    state.isFetching = false;
    state.isFetched = true;
    state.payload = action.payload as Draft<P>;
    state.error = null;
  });
  builder.addCase(fetch.rejected, (state, action): void => {
    state.isFetching = false;
    state.isFetched = true;
    state.error = action.payload as object;
  });
};

export const getFetchReducers = <P>(): SliceCaseReducers<
  Core.FetchState<P>
> => ({
  fetchReset: (): Core.FetchState<null> => CONSTS.INITIAL_FETCH_STATE,
});
