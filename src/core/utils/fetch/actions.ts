import { createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './consts';
import { SliceOptionalConfig, SliceRequiredConfig } from './types';

function getFetchThunk<P, A>(
  config: SliceOptionalConfig<P, A>,
): AsyncThunk<P, A, {}>;
function getFetchThunk<P, A, R>(
  config: SliceRequiredConfig<P, A, R>,
): AsyncThunk<P, A, {}>;
function getFetchThunk<P, A>({ domain, apiMethod, onFulfilled, onRejected }) {
  return createAsyncThunk<P, A>(
    getFetchDomain(domain),
    async (payload, { dispatch, getState }) => {
      try {
        const apiResponse = await apiMethod(payload);

        if (onFulfilled) {
          const handlerResponse = await onFulfilled({
            apiArg: payload,
            apiResponse,
            dispatch,
            getState,
          });

          return handlerResponse || apiResponse;
        }

        return apiResponse;
      } catch (error) {
        if (onRejected) {
          await onRejected({
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
