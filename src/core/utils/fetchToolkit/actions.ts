import { createAsyncThunk, ThunkDispatch, AnyAction } from '@reduxjs/toolkit';

import { getFetchDomain } from './consts';

type FetchArgRequired<A, R, P> = Core.FetchConfigRequired<
  A,
  R,
  P,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

type FetchArgOptional<A, P> = Core.FetchConfigOptional<
  A,
  P,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export const getFetchThunkWithOptionalHandler = <A, P>({
  domain,
  apiMethod,
}: Core.FetchSliceConfig<A, P>) =>
  createAsyncThunk<P, FetchArgOptional<A, P>>(
    getFetchDomain(domain),
    async ({ payload, handleSuccess, handleError }, { dispatch, getState }) => {
      let response: P;

      try {
        response = await apiMethod(payload);

        if (handleSuccess) {
          await handleSuccess(response, dispatch, getState);
        }
      } catch (error) {
        let response: object;

        if (handleError) {
          response = await handleError(error, dispatch, getState);
        }

        throw response;
      }

      return response;
    },
  );

export const getFetchThunkWithRequiredHandler = <A, R, P>({
  domain,
  apiMethod,
}: Core.FetchSliceConfig<A, R>) =>
  createAsyncThunk<P, FetchArgRequired<A, R, P>>(
    getFetchDomain(domain),
    async ({ payload, handleSuccess, handleError }, { dispatch, getState }) => {
      let response: P;

      try {
        const apiResponse = await apiMethod(payload);
        response = await handleSuccess(apiResponse, dispatch, getState);
      } catch (error) {
        let response: object;

        if (handleError) {
          response = await handleError(error, dispatch, getState);
        }

        throw response;
      }

      return response;
    },
  );
