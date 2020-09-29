import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './utils';
import { FetchSliceConfig, ApiMethodExtend, FetchThunkArgs } from './types';

function getFetchThunk<P, AM extends ApiMethodExtend>({
  domain,
  apiMethod,
}: FetchSliceConfig<P, AM>) {
  return createAsyncThunk<P, FetchThunkArgs<P, AM>>(
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
) {
  const fetchThunk = getFetchThunk<P, AM>(config);

  type Payload = FetchThunkArgs<P, AM>['payload'];
  type OnSuccess = FetchThunkArgs<P, AM>['onSuccess'];
  type OnFailure = FetchThunkArgs<P, AM>['onFailure'];
  type FetchThunkWrapperConfig = {
    onSuccess: OnSuccess;
    onFailure: OnFailure;
  };

  const fetchThunkWrapper = (
    payload: Payload,
    config?: FetchThunkWrapperConfig,
  ) => {
    return fetchThunk({
      payload,
      ...config,
    } as any);
  };

  return { fetchThunk, fetchThunkWrapper };
}

export { getFetchThunkWrapper };
