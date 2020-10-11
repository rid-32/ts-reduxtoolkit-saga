import { put, takeLatest } from 'redux-saga/effects';

import { ordersSagas, ordersTableActions } from './slice';

type OrdersSuccessSaga = Parameters<
  typeof ordersSagas.fetchSaga
>[0]['onSuccess'];

const ordersSuccessSaga: OrdersSuccessSaga = function* ({ apiResponse }) {
  yield put(ordersTableActions.changeTotal(apiResponse.total));

  return apiResponse.data;
};

export default function* () {
  yield* ordersSagas.fetchSaga({
    onSuccess: ordersSuccessSaga,
  });
  yield takeLatest('SAGA_AFTER_FETCH_SAGA', function* () {
    yield console.log('SAGA_AFTER_FETCH_SAGA');
  });
}
