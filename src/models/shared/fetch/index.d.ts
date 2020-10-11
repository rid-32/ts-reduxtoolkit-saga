import { Reducer } from 'redux';
import {
  ThunkDispatch,
  AnyAction,
  SerializedError,
  AsyncThunk,
  Selector,
} from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';

import { State } from 'models/store';

type FetchState<P = null> = {
  status: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILURE';
  payload: P | null;
  error: SerializedError | null;
};

type ApiMethodExtend = (arg0: any) => Promise<any>;

type FetchSliceConfig<P, AM> = {
  domain: string;
  apiMethod: AM;
  initialState?: Partial<FetchState<P>>;
};

type AsyncFetchThunkArgs<P, AM> = AM extends (arg0: infer A) => PromiseLike<P>
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

type FetchThunkOptional<A, R, AM> = {
  (
    payload: A,
    config?: {
      onSuccess?: (arg0: {
        apiArg: A;
        apiResponse: R;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
      }) => Promise<void>;
      onFailure?: (arg0: {
        apiArg: A;
        apiError: Error;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
      }) => Promise<void>;
    },
  ): AsyncFetchThunk<R, AM>;
} & {
  pending: () => void;
  fulfilled: (arg0: R) => void;
  rejected: (arg0: SerializedError) => void;
};

type FetchThunkRequired<A, R, P, AM> = {
  (
    payload: A,
    config: {
      onSuccess: (arg0: {
        apiArg: A;
        apiResponse: R;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
      }) => Promise<P>;
      onFailure?: (arg0: {
        apiArg: A;
        apiError: Error;
        dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
        getState: () => unknown;
      }) => Promise<void>;
    },
  ): AsyncFetchThunk<P, AM>;
} & {
  pending: () => void;
  fulfilled: (arg0: P) => void;
  rejected: (arg0: SerializedError) => void;
};

type FetchThunk<P, AM> = AM extends (arg0: infer A) => PromiseLike<P>
  ? FetchThunkOptional<A, P, AM>
  : AM extends (arg0: infer B) => PromiseLike<infer R>
  ? FetchThunkRequired<B, R, P, AM>
  : any;

type FetchSagaOptional<A, R> = {
  (config?: {
    onSuccess?: (arg0: { apiArg: A; apiResponse: R }) => Iterator<any, R>;
  }): Generator<ReturnType<typeof takeLatest>, void>;
};

type FetchSagaRequired<A, R, P> = {
  (config: {
    onSuccess: (arg0: { apiArg: A; apiResponse: R }) => Iterator<any, P>;
  }): Generator<ReturnType<typeof takeLatest>, void>;
};

type FetchSaga<P, AM> = AM extends (arg0: infer A) => PromiseLike<P>
  ? FetchSagaOptional<A, P>
  : AM extends (arg0: infer B) => PromiseLike<infer R>
  ? FetchSagaRequired<B, R, P>
  : any;

type Selectors<P> = {
  isInitial: Selector<State, boolean>;
  useIsInitial: () => boolean;
  isPending: Selector<State, boolean>;
  useIsPending: () => boolean;
  isSuccess: Selector<State, boolean>;
  useIsSuccess: () => boolean;
  isFailure: Selector<State, boolean>;
  useIsFailure: () => boolean;
  payload: Selector<State, P | null>;
  usePayload: () => P | null;
  error: Selector<State, SerializedError | null>;
  useError: () => SerializedError | null;
};

export function createFetchSlice<AM extends ApiMethodExtend>(
  config: AM extends (...args: any) => PromiseLike<infer R>
    ? FetchSliceConfig<R, AM>
    : any,
): {
  reducer: AM extends (...args: any) => PromiseLike<infer R>
    ? Reducer<FetchState<R>>
    : any;
  actions: AM extends (arg: infer A) => PromiseLike<infer R>
    ? {
        fetchThunk: FetchThunk<R, AM>;
        useFetchThunk: () => FetchThunk<R, AM>;
        resetFetch: () => void;
        fetchSaga: {
          (arg0: A): void;
          type: string;
        };
      }
    : any;
  selectors: AM extends (...args: any) => PromiseLike<infer R>
    ? Selectors<R>
    : any;
  sagas: AM extends (arg0: any) => PromiseLike<infer R>
    ? {
        fetchSaga: FetchSaga<R, AM>;
      }
    : any;
};

export function createFetchSlice<P, AM extends ApiMethodExtend>(
  config: FetchSliceConfig<P, AM>,
): {
  reducer: Reducer<FetchState<P>>;
  actions: AM extends (arg: infer A) => any
    ? {
        fetchThunk: FetchThunk<P, AM>;
        useFetchThunk: () => FetchThunk<P, AM>;
        resetFetch: () => void;
        useResetFetch: () => () => void;
        fetchSaga: {
          (arg0: A): void;
          type: string;
        };
        useFetchSaga: () => (arg0: A) => void;
      }
    : any;
  selectors: Selectors<P>;
  sagas: AM extends (arg: any) => any
    ? {
        fetchSaga: FetchSaga<P, AM>;
      }
    : any;
};
