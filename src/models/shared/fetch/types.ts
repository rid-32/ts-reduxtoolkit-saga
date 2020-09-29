import {
  ThunkDispatch,
  AnyAction,
  SerializedError,
  AsyncThunk,
} from '@reduxjs/toolkit';

export type FetchStatus = 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILURE';

export type FetchState<P = null> = {
  status: FetchStatus;
  payload: P | null;
  error: SerializedError | null;
};

export type ApiMethodExtend = (arg0: any) => Promise<any>;

export type FetchSliceConfig<P, AM> = {
  domain: string;
  apiMethod: AM;
  initialState?: Partial<FetchState<P>>;
};

export type AsyncFetchThunkArgs<P, AM> = AM extends (
  arg0: infer A,
) => PromiseLike<P>
  ? {
      payload: A;
      onSuccess?: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiResponse: P;
      }) => Promise<void>;
      onFailure?: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiError: Error;
      }) => Promise<void>;
    }
  : AM extends (arg0: infer B) => PromiseLike<infer R>
  ? {
      payload: B;
      onSuccess: (arg0: {
        apiArg: B;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiResponse: R;
      }) => Promise<P>;
      onFailure?: (arg0: {
        apiArg: B;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiError: Error;
      }) => Promise<void>;
    }
  : any;

type AsyncFetchThunk<P, AM> = AsyncThunk<
  P,
  AsyncFetchThunkArgs<P, AM>,
  Record<string, unknown>
>;

type FetchThunkActions = {
  pending: any;
  fulfilled: any;
  rejected: any;
};

type FetchThunkOptional<A, R, AM> = {
  (
    payload: A,
    config?: {
      onSuccess?: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiResponse: R;
      }) => Promise<void>;
      onFailure?: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiError: Error;
      }) => Promise<void>;
    },
  ): AsyncFetchThunk<R, AM>;
} & FetchThunkActions;

type FetchThunkRequired<A, R, P, AM> = {
  (
    payload: A,
    config: {
      onSuccess: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiResponse: R;
      }) => Promise<P>;
      onFailure?: (arg0: {
        apiArg: A;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
        apiError: Error;
      }) => Promise<void>;
    },
  ): AsyncFetchThunk<P, AM>;
} & FetchThunkActions;

export type FetchThunk<P, AM> = AM extends (arg0: infer A) => PromiseLike<P>
  ? FetchThunkOptional<A, P, AM>
  : AM extends (arg0: infer B) => PromiseLike<infer R>
  ? FetchThunkRequired<B, R, P, AM>
  : any;
