import {
  ThunkDispatch,
  AnyAction,
  SerializedError,
  Reducer,
  ActionCreatorWithoutPayload,
  AsyncThunk,
  AsyncThunkAction,
} from '@reduxjs/toolkit';

import { State } from 'core/store';

export type FetchState<P> = {
  isFetching: boolean;
  isFetched: boolean;
  payload: P;
  error: SerializedError;
};

type HandlerCommonProps<A> = {
  apiArg: A;
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  getState: () => unknown;
};

export type OnFulfilledProps<A, R> = HandlerCommonProps<A> & {
  apiResponse: R;
};

export type OnRejectedProps<A> = HandlerCommonProps<A> & {
  apiError: Error;
};

type SliceCommonConfig<P, A, R> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<R>;
  onRejected?: (arg0: OnRejectedProps<A>) => Promise<void>;
  initialState?: Partial<FetchState<P>>;
};

export type SliceOptionalConfig<P, A> = SliceCommonConfig<P, A, P> & {
  onFulfilled?: (arg0: OnFulfilledProps<A, P>) => Promise<void>;
};

export type SliceRequiredConfig<P, A, R> = SliceCommonConfig<P, A, R> & {
  onFulfilled: (arg0: OnFulfilledProps<A, R>) => Promise<P>;
};

export type FetchSliceActions<P, A> = {
  fetchReset: ActionCreatorWithoutPayload;
  fetchThunk: AsyncThunk<P, A, {}>;
  useFetchThunk: () => (arg0: A) => AsyncThunkAction<P, A, {}>;
};

export type FetchSliceSelectors<P> = {
  isFetching: (state: State) => boolean;
  useIsFetching: () => boolean;
  isFetched: (state: State) => boolean;
  useIsFetched: () => boolean;
  payload: (state: State) => P;
  usePayload: () => P;
  error: (state: State) => SerializedError;
  useError: () => SerializedError;
};

export type CreateFetchSliceResponse<P, A> = {
  reducer: Reducer<FetchState<P>, AnyAction>;
  selectors: FetchSliceSelectors<P>;
  actions: FetchSliceActions<P, A>;
};
