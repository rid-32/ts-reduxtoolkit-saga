import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './consts';
import { FetchArgOptional, FetchArgRequired } from './types';

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
        if (handleError) {
          await handleError(error, dispatch, getState);
        }

        throw error;
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
        if (handleError) {
          await handleError(error, dispatch, getState);
        }

        throw error;
      }

      return response;
    },
  );
