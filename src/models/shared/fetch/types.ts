import {
  ThunkDispatch,
  AnyAction,
  SerializedError,
  Reducer,
  ActionCreatorWithoutPayload,
  AsyncThunk,
  AsyncThunkAction,
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

type SliceCommonConfig<P, A, R> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<R>;
  onRejected?: OnFailure<A>;
  initialState?: Partial<FetchState<P>>;
};

export type SliceOptionalConfig<P, A> = SliceCommonConfig<P, A, P> & {
  onSuccess?: OnSuccessOptional<A, P>;
};

export type SliceRequiredConfig<P, A, R> = SliceCommonConfig<P, A, R> & {
  onSuccess: OnSuccessRequired<P, A, R>;
};

export type FetchSliceActions<P, A> = {
  resetFetch: ActionCreatorWithoutPayload;
  fetchThunk: AsyncThunk<P, A, {}>;
  useFetchThunk: () => (arg0: A) => AsyncThunkAction<P, A, {}>;
};

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

export type CreateFetchSliceResponse<P, A> = {
  reducer: Reducer<FetchState<P>, AnyAction>;
  selectors: FetchSliceSelectors<P>;
  actions: FetchSliceActions<P, A>;
};
