import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { getFetchDomain } from './utils';

const getFetchThunk = ({ domain, apiMethod }) => {
  return createAsyncThunk(
    getFetchDomain(domain),
    async (
      { payload, preProcess, onSuccess, onFailure },
      { dispatch, getState },
    ) => {
      try {
        const apiPayload = preProcess ? await preProcess(payload) : payload;

        const apiResponse = await apiMethod(apiPayload);

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

export const getFetchActions = (actions, fetchThunk) => ({
  ...actions,
  fetchThunk,
  useFetchThunk: () => {
    const dispatch = useDispatch();

    return (payload, config) => dispatch(fetchThunk(payload, config));
  },
  useResetFetch: () => {
    const dispatch = useDispatch();

    return () => dispatch(actions.resetFetch());
  },
  useFetchSaga: () => {
    const dispatch = useDispatch();

    return payload => dispatch(actions.fetchSaga(payload));
  },
});
