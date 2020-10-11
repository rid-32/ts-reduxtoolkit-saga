import { all } from 'redux-saga/effects';

import { sagas as sellersSagas } from './sellers';

export default function* rootSaga() {
  yield all([sellersSagas()]);
}
