import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './consts';

export type SliceConfig<P, A> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<P>;
  onFulfilled?: (arg0: P) => Promise<void>;
  onRejected?: (arg0: Error) => Promise<void>;
};

export type SliceConfig2<P, A, R> = {
  domain: string;
  apiMethod: (arg0: A) => Promise<R>;
  onFulfilled: (arg0: R) => Promise<P>;
  onRejected?: (arg0: Error) => Promise<void>;
};

function getFetchThunk<P, A>(config: SliceConfig<P, A>): any;
function getFetchThunk<P, A, R>(config: SliceConfig2<P, A, R>): any;
function getFetchThunk<P, A>({ domain, apiMethod, onFulfilled, onRejected }) {
  return createAsyncThunk<P, A>(getFetchDomain(domain), async payload => {
    try {
      const apiResponse = await apiMethod(payload);

      if (onFulfilled) {
        const handlerResponse = await onFulfilled(apiResponse);

        return handlerResponse || apiResponse;
      }

      return apiResponse;
    } catch (error) {
      if (onRejected) {
        await onRejected(error);
      }

      throw error;
    }
  });
}

export { getFetchThunk };

// export const getFetchThunkWithRequiredHandler = <P, A, R>({
//   domain,
//   apiMethod,
//   onFulfilled,
//   onRejected,
// }: FetchSliceRequiredConfig<P, A, R>) =>
//   createAsyncThunk<P, A>(getFetchDomain(domain), async payload => {
//     try {
//       const apiResponse = await apiMethod(payload);
//       const handlerResponse = await onFulfilled(apiResponse);
//
//       return handlerResponse;
//     } catch (error) {
//       if (onRejected) {
//         await onRejected(error);
//       }
//
//       throw error;
//     }
//   });
//
// export const getFetchThunkWithOptionalHandler = <P, A>({
//   domain,
//   apiMethod,
//   onFulfilled,
//   onRejected,
// }: FetchSliceOptionalConfig<P, A>) =>
//   createAsyncThunk<P, A>(getFetchDomain(domain), async payload => {
//     try {
//       const apiResponse = await apiMethod(payload);
//
//       if (onFulfilled) {
//         await onFulfilled(apiResponse);
//       }
//
//       return apiResponse;
//     } catch (error) {
//       if (onRejected) {
//         await onRejected(error);
//       }
//
//       throw error;
//     }
//   });

// export const getFetchThunkWithOptionalHandler = <A, P>({
//   domain,
//   apiMethod,
// }: Core.FetchSliceConfig<A, P>) =>
//   createAsyncThunk<P, FetchArgOptional<A, P>>(
//     getFetchDomain(domain),
//     async ({ payload, handleSuccess, handleError }, { dispatch, getState }) => {
//       let response: P;
//
//       try {
//         response = await apiMethod(payload);
//
//         if (handleSuccess) {
//           await handleSuccess(response, dispatch, getState);
//         }
//       } catch (error) {
//         if (handleError) {
//           await handleError(error, dispatch, getState);
//         }
//
//         throw error;
//       }
//
//       return response;
//     },
//   );
//
// export const getFetchThunkWithRequiredHandler = <A, R, P>({
//   domain,
//   apiMethod,
// }: Core.FetchSliceConfig<A, R>) =>
//   createAsyncThunk<P, FetchArgRequired<A, R, P>>(
//     getFetchDomain(domain),
//     async ({ payload, handleSuccess, handleError }, { dispatch, getState }) => {
//       let response: P;
//
//       try {
//         const apiResponse = await apiMethod(payload);
//         response = await handleSuccess(apiResponse, dispatch, getState);
//       } catch (error) {
//         if (handleError) {
//           await handleError(error, dispatch, getState);
//         }
//
//         throw error;
//       }
//
//       return response;
//     },
//   );
