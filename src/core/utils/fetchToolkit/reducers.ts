import {
  SliceCaseReducers,
  ActionReducerMapBuilder,
  Draft,
} from '@reduxjs/toolkit';

import * as CONSTS from './consts';
import { FetchOptional, FetchRequired } from './types';

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
    state.error = action.error;
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
    state.error = action.error;
  });
};

export const getFetchReducers = <P>(): SliceCaseReducers<
  Core.FetchState<P>
> => ({
  fetchReset: (): Core.FetchState<null> => CONSTS.INITIAL_FETCH_STATE,
});
