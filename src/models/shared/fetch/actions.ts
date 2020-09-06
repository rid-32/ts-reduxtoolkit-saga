import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './utils';
import {
  FetchSliceConfig,
  FetchThunkArgOptional,
  FetchThunkArgRequired,
  FetchThunkOptional,
  FetchThunkRequired,
} from './types';

function getFetchThunk<P, A>(
  config: FetchSliceConfig<P, A, P>,
): AsyncThunk<P, FetchThunkArgOptional<P, A>, {}>;
function getFetchThunk<P, A, R>(
  config: FetchSliceConfig<P, A, R>,
): AsyncThunk<P, FetchThunkArgRequired<P, A, R>, {}>;
function getFetchThunk({ domain, apiMethod }) {
  return createAsyncThunk<unknown, unknown>(
    getFetchDomain(domain),
    async ({ payload, onSuccess, onFailure }, { dispatch, getState }) => {
      try {
        const apiResponse = await apiMethod(payload);

        if (onSuccess) {
          const handlerResponse = await onSuccess({
            apiArg: payload,
            apiResponse,
            dispatch,
            getState,
          });

          return handlerResponse || apiResponse;
        }

        return apiResponse;
      } catch (error) {
        if (onFailure) {
          await onFailure({
            apiArg: payload,
            apiError: error,
            dispatch,
            getState,
          });
        }

        throw error;
      }
    },
  );
}

function getFetchThunkWrapper<P, A>(
  config: FetchSliceConfig<P, A, P>,
): FetchThunkOptional<P, A>;
function getFetchThunkWrapper<P, A, R>(
  config: FetchSliceConfig<P, A, R>,
): FetchThunkRequired<P, A, R>;
function getFetchThunkWrapper<P, A, R>(config: any) {
  const originFetchThunk = getFetchThunk<P, A, R>(config);

  function fetchThunk(payload: A, thunkConfig: any) {
    return originFetchThunk({
      payload,
      ...thunkConfig,
    });
  }

  fetchThunk['pending'] = originFetchThunk.pending;
  fetchThunk['fulfilled'] = originFetchThunk.fulfilled;
  fetchThunk['rejected'] = originFetchThunk.rejected;

  return fetchThunk;
}

export { getFetchThunk, getFetchThunkWrapper };
