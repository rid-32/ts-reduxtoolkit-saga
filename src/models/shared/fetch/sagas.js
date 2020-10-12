import { takeLatest, put, call } from 'redux-saga/effects';

export const getFetchSagas = (apiMethod, actions) => {
  return {
    fetchSaga: function* (config) {
      yield takeLatest(actions.fetchSaga.type, function* (action) {
        yield put(actions.fetchThunk.pending());

        let apiPayload = action.payload;

        try {
          if (config.preProcess) {
            apiPayload = yield call(config.preProcess, { apiArg: apiPayload });
          }

          const apiResponse = yield call(apiMethod, apiPayload);
          let result = apiResponse;

          if (config.onSuccess) {
            const handledResponse = yield call(config.onSuccess, {
              apiPayload,
              apiResponse,
            });

            if (handledResponse) {
              result = handledResponse;
            }
          }

          yield put(actions.fetchThunk.fulfilled(result));
        } catch (error) {
          let resultError = error;

          if (config.onFailure) {
            try {
              yield call(config.onFailure, {
                apiPayload,
                apiError: error,
              });
            } catch (handleError) {
              resultError = handleError;
            }
          }

          yield call(actions.fetchThunk.rejected(resultError));
        }
      });
    },
  };
};
