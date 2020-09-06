import { all } from 'redux-saga/effects';

import { ordersSagas } from './sellers';

export default function* rootSaga() {
  yield all([ordersSagas()]);
}
