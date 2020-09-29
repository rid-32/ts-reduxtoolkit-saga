import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './utils';
import {
  FetchSliceConfig,
  ApiMethodExtend,
  AsyncFetchThunkArgs,
  FetchThunk,
} from './types';

function getFetchThunk<P, AM extends ApiMethodExtend>({
  domain,
  apiMethod,
}: FetchSliceConfig<P, AM>) {
  return createAsyncThunk<P, AsyncFetchThunkArgs<P, AM>>(
    getFetchDomain(domain),
    async ({ payload, onSuccess, onFailure }, { dispatch, getState }) => {
      try {
        const apiResponse = await apiMethod(payload);

        if (onSuccess) {
          const handlerResponse = (await onSuccess({
            apiArg: payload,
            apiResponse,
            dispatch,
            getState,
          })) as any;

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

function getFetchThunkWrapper<P, AM extends ApiMethodExtend>(
  config: FetchSliceConfig<P, AM>,
): FetchThunk<P, AM> {
  const fetchThunk = getFetchThunk<P, AM>(config);

  const fetchThunkWrapper: any = (payload, config) => {
    return fetchThunk({
      payload,
      ...config,
    } as any);
  };

  fetchThunkWrapper.pending = fetchThunk.pending;
  fetchThunkWrapper.fulfilled = fetchThunk.fulfilled;
  fetchThunkWrapper.rejected = fetchThunk.rejected;

  return fetchThunkWrapper;
}

export { getFetchThunkWrapper };
