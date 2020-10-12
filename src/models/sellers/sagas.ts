import { put, takeLatest } from 'redux-saga/effects';

import { ordersSagas, ordersTableActions } from './slice';
import { SuccessSaga, PreProcessSaga } from 'models/shared';

const ordersPreProcess: PreProcessSaga<typeof ordersSagas.fetchSaga> = function* () {
  yield;
  return 'PRE_PROCESSED_DATA';
};

const ordersSuccessSaga: SuccessSaga<typeof ordersSagas.fetchSaga> = function* ({
  apiResponse,
}) {
  yield put(ordersTableActions.changeTotal(apiResponse.total));

  return apiResponse.data;
};

export default function* () {
  yield* ordersSagas.fetchSaga({
    preProcess: ordersPreProcess,
    onSuccess: ordersSuccessSaga,
  });
  yield takeLatest('SAGA_AFTER_FETCH_SAGA', function* () {
    yield console.log('SAGA_AFTER_FETCH_SAGA');
  });
}
