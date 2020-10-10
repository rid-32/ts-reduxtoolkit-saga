import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFetchDomain } from './utils';

const getFetchThunk = ({ domain, apiMethod }) => {
  return createAsyncThunk(
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
};

export const getFetchThunkWrapper = config => {
  const fetchThunk = getFetchThunk(config);

  const fetchThunkWrapper = (payload, config) => {
    return fetchThunk({
      payload,
      ...config,
    });
  };

  fetchThunkWrapper.pending = fetchThunk.pending;
  fetchThunkWrapper.fulfilled = fetchThunk.fulfilled;
  fetchThunkWrapper.rejected = fetchThunk.rejected;

  return fetchThunkWrapper;
};
