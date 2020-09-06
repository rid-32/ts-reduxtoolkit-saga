import { takeLatest } from 'redux-saga/effects';

export function* ordersSagas() {
  yield takeLatest('FETCH_ORDERS', function* () {
    yield console.log('HELLO WORLD');
  });
}
