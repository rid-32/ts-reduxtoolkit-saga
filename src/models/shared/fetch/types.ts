import {
  ThunkDispatch,
  AnyAction,
  SerializedError,
  Reducer,
  ActionCreatorWithoutPayload,
  AsyncThunk,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import { State } from 'models/store';

export type FetchStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILURE';

export type FetchState<P> = {
  status: FetchStatus;
  payload: P;
  error: SerializedError;
};

type HandlerCommonProps<A> = {
  apiArg: A;
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
  getState: () => unknown;
};

export type OnSuccessProps<A, R> = HandlerCommonProps<A> & {
  apiResponse: R;
};

export type OnFailureProps<A> = HandlerCommonProps<A> & {
  apiError: Error;
};

export type OnSuccessOptional<A, R> = (
  arg0: OnSuccessProps<A, R>,
) => Promise<void>;

export type OnSuccessRequired<P, A, R> = (
  arg0: OnSuccessProps<A, R>,
) => Promise<P>;

export type OnFailure<A> = (arg0: OnFailureProps<A>) => Promise<void>;

export type FetchSliceConfig<P, A, R> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<R>;
  initialState?: Partial<FetchState<P>>;
};

type FetchThunkConfigCommon<A> = {
  onFailure?: OnFailure<A>;
};

export type FetchThunkConfigRequired<P, A, R> = FetchThunkConfigCommon<A> & {
  onSuccess: OnSuccessRequired<P, A, R>;
};

export type FetchThunkConfigOptional<P, A> = FetchThunkConfigCommon<A> & {
  onSuccess?: OnSuccessOptional<P, A>;
};

export type FetchThunkArgCommon<A> = {
  payload: A;
};

export type FetchThunkArgRequired<P, A, R> = FetchThunkConfigRequired<P, A, R> &
  FetchThunkArgCommon<A>;

export type FetchThunkArgOptional<P, A> = FetchThunkConfigOptional<P, A> &
  FetchThunkArgCommon<A>;

export type FetchSliceSelectors<P> = {
  isInitial: (state: State) => boolean;
  useIsInitial: () => boolean;
  isPending: (state: State) => boolean;
  useIsPending: () => boolean;
  isSuccess: (state: State) => boolean;
  useIsSuccess: () => boolean;
  isFailure: (state: State) => boolean;
  useIsFailure: () => boolean;
  isFetched: (state: State) => boolean;
  useIsFetched: () => boolean;
  payload: (state: State) => P;
  usePayload: () => P;
  error: (state: State) => SerializedError;
  useError: () => SerializedError;
};

export type FetchThunkOptional<P, A> = (
  arg0: A,
  arg1: FetchThunkConfigOptional<P, A>,
) => ReturnType<
  AsyncThunk<P, FetchThunkArgOptional<P, A>, Record<string, unknown>>
>;

export type FetchThunkRequired<P, A, R> = (
  arg0: A,
  arg1: FetchThunkConfigRequired<P, A, R>,
) => ReturnType<
  AsyncThunk<P, FetchThunkArgRequired<P, A, R>, Record<string, unknown>>
>;

type FetchSliceActionsCommon<A> = {
  resetFetch: ActionCreatorWithoutPayload;
  fetchSaga: ActionCreatorWithPayload<A>;
  useFetchSaga: () => ActionCreatorWithPayload<A>;
};

export type FetchSliceActionsOptional<P, A> = FetchSliceActionsCommon<A> & {
  fetchThunk: FetchThunkOptional<P, A>;
  useFetchThunk: () => FetchThunkOptional<P, A>;
};

export type FetchSliceActionsRequired<P, A, R> = FetchSliceActionsCommon<A> & {
  fetchThunk: FetchThunkRequired<P, A, R>;
  useFetchThunk: () => FetchThunkRequired<P, A, R>;
};

type CreateFetchSliceResponseCommon<P> = {
  reducer: Reducer<FetchState<P>, AnyAction>;
  selectors: FetchSliceSelectors<P>;
};

export type CreateFetchSliceResponseOptional<
  P,
  A
> = CreateFetchSliceResponseCommon<P> & {
  actions: FetchSliceActionsOptional<P, A>;
};

export type CreateFetchSliceResponseRequired<
  P,
  A,
  R
> = CreateFetchSliceResponseCommon<P> & {
  actions: FetchSliceActionsRequired<P, A, R>;
};
