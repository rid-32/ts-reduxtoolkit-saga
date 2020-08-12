import { ThunkDispatch, AnyAction, AsyncThunk } from '@reduxjs/toolkit';

type FetchSlicePartialConfig<A, R> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<R>;
  onRejected?: (arg0: Error) => Promise<void>;
};

export type FetchSliceRequiredConfig<P, A, R> = FetchSlicePartialConfig<
  A,
  R
> & {
  onFulfilled: (arg0: R) => Promise<P>;
};

export type FetchSliceOptionalConfig<P, A> = FetchSlicePartialConfig<A, P> & {
  onFulfilled?: (arg0: P) => Promise<void>;
};

// export type FetchHandlersOptional<A> = Core.FetchHandlersOptional<
//   A,
//   ThunkDispatch<unknown, unknown, AnyAction>
// >;
//
// export type FetchHandlersRequired<A, R> = Core.FetchHandlersRequired<
//   A,
//   R,
//   ThunkDispatch<unknown, unknown, AnyAction>
// >;
//
// export type FetchArgRequired<A, R, P> = Core.FetchConfigRequired<
//   A,
//   R,
//   P,
//   ThunkDispatch<unknown, unknown, AnyAction>
// >;
//
// export type FetchArgOptional<A, P> = Core.FetchConfigOptional<
//   A,
//   P,
//   ThunkDispatch<unknown, unknown, AnyAction>
// >;
//
// export type FetchOptional<A, P> = AsyncThunk<
//   P,
//   Core.FetchConfigOptional<A, P, ThunkDispatch<unknown, unknown, AnyAction>>,
//   {}
// >;
//
// export type FetchRequired<A, R, P> = AsyncThunk<
//   P,
//   Core.FetchConfigRequired<A, R, P, ThunkDispatch<unknown, unknown, AnyAction>>,
//   {}
// >;
