import { combineReducers } from 'redux';

import { createFetchSlice, createTableSlice } from 'core/utils';
import * as CONSTS from './consts';
import { fetchOrders } from 'api/sellers';
import { getOrdersFulfilledHandler } from './actions';

const {
  reducer: ordersTableReducer,
  selectors: ordersTableSelectors,
  actions: ordersTableActions,
} = createTableSlice({
  domain: CONSTS.ORDERS_TABLE_DOMAIN,
  initialState: CONSTS.ORDERS_TABLE_INITIAL_STATE,
});

const {
  reducer: ordersReducer,
  selectors: ordersSelectors,
  actions: ordersActions,
} = createFetchSlice<Order.Element[], void, Order.Table>({
  domain: CONSTS.ORDERS_DOMAIN,
  apiMethod: fetchOrders,
  onFulfilled: getOrdersFulfilledHandler(ordersTableActions),
});

export const reducer = {
  [CONSTS.SELLERS_SLICE]: combineReducers({
    [CONSTS.ORDERS_SLICE]: ordersReducer,
    [CONSTS.ORDERS_TABLE_SLICE]: ordersTableReducer,
  }),
};

export {
  ordersSelectors,
  ordersActions,
  ordersTableSelectors,
  ordersTableActions,
};
