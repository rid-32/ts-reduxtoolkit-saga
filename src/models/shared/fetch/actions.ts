import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './consts';
import { SliceOptionalConfig, SliceRequiredConfig } from './types';

function getFetchThunk<P, A>(
  config: SliceOptionalConfig<P, A>,
): AsyncThunk<P, A, {}>;
function getFetchThunk<P, A, R>(
  config: SliceRequiredConfig<P, A, R>,
): AsyncThunk<P, A, {}>;
function getFetchThunk<P, A>({ domain, apiMethod, onSuccess, onFailure }) {
  return createAsyncThunk<P, A>(
    getFetchDomain(domain),
    async (payload, { dispatch, getState }) => {
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

export { getFetchThunk };
