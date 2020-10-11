import { takeLatest } from 'redux-saga/effects';

import { ordersActions } from './slice';

// import { ordersActions, ordersSagas } from './slice';

// function* ordersSuccessSaga({ apiResponse }) {
//   const { total } = apiResponse;
//
//   yield put(ordersTable.changeTotal.total);
// }

export function* ordersSagas() {
  yield takeLatest(ordersActions.fetchSaga.type, function* () {
    yield console.log('HELLO WORLD');
  });
  // yield takeLatest(
  //   ordersActions.fetchSaga.type,
  //   ordersSagas.createFetchSaga({
  //     apiMethod: async () => {},
  //     onSuccess: ordersSuccessSaga,
  //   }),
  // );
}
