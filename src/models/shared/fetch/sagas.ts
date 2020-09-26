import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, call } from 'redux-saga/effects';

function getFetchSaga(apiMethod, actions) {
  return function* (config) {
    yield takeLatest(actions.fetchSaga.type, function* (
      action: PayloadAction<any>,
    ) {
      yield put(actions.fetchThunk.pending());

      try {
        const apiPayload = action.payload;
        // const apiPayload = config.preProcessor
        //   ? yield call(config.preProcessor, action.payload)
        //   : action.payload;
        const apiResponse = yield call(apiMethod, apiPayload);
        let result = apiResponse;

        if (config.onSuccess) {
          const handledResponse = yield call(
            config.onSuccess,
            apiResponse,
            apiPayload,
          );

          if (handledResponse) {
            result = handledResponse;
          }
        }

        yield put(actions.fetchThunk.fulfilled(result));
      } catch (error) {
        if (config.onFailure) {
          yield call(config.onFailure, error, action.payload);
        }

        yield call(actions.fetchThunk.rejected(error));
      }
    });
  };
}

export { getFetchSaga };
