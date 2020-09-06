import { combineReducers } from 'redux';

import { createFetchSlice, createTableControlSlice } from 'models/shared';
import * as CONSTS from './consts';
import { fetchOrders } from 'services/sellers';
import { Order, OrdersTable } from './types';

const {
  reducer: ordersTableReducer,
  selectors: ordersTableSelectors,
  actions: ordersTableActions,
} = createTableControlSlice({
  domain: CONSTS.ORDERS_TABLE_DOMAIN,
  initialState: CONSTS.ORDERS_TABLE_INITIAL_STATE,
});

const {
  reducer: ordersReducer,
  selectors: ordersSelectors,
  actions: ordersActions,
} = createFetchSlice<Order[], void, OrdersTable>({
  domain: CONSTS.ORDERS_DOMAIN,
  apiMethod: fetchOrders,
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
