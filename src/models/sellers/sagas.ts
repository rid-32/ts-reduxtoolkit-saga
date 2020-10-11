import { call, put } from 'redux-saga/effects';

import { ordersSagas, ordersTableActions } from './slice';

function* ordersSuccessSaga({ apiResponse }) {
  yield put(ordersTableActions.changeTotal(apiResponse.total));

  return apiResponse.data;
}

export default function* () {
  yield call(ordersSagas.fetchSaga, {
    onSuccess: ordersSuccessSaga,
  });
  // TODO: add another saga to figure out if it works
}
