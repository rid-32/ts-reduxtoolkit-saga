import { ThunkDispatch, AnyAction, AsyncThunk } from '@reduxjs/toolkit';

export type FetchHandlersOptional<A> = Core.FetchHandlersOptional<
  A,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export type FetchHandlersRequired<A, R> = Core.FetchHandlersRequired<
  A,
  R,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export type FetchArgRequired<A, R, P> = Core.FetchConfigRequired<
  A,
  R,
  P,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export type FetchArgOptional<A, P> = Core.FetchConfigOptional<
  A,
  P,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export type FetchOptional<A, P> = AsyncThunk<
  P,
  Core.FetchConfigOptional<A, P, ThunkDispatch<unknown, unknown, AnyAction>>,
  {}
>;

export type FetchRequired<A, R, P> = AsyncThunk<
  P,
  Core.FetchConfigRequired<A, R, P, ThunkDispatch<unknown, unknown, AnyAction>>,
  {}
>;
