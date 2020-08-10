import { combineReducers } from 'redux';

import { createFetchHandlingSlice } from 'core/utils/fetchToolkit';
import * as CONSTS from './consts';
import { fetchOrders } from 'api/sellers';

const {
  reducer: ordersReducer,
  selectors: ordersSelectors,
  actions: ordersActions,
} = createFetchHandlingSlice<Order.Element[], Order.Table>({
  domain: CONSTS.ORDERS_DOMAIN,
  apiMethod: fetchOrders,
});

export const reducers = {
  [CONSTS.SELLERS_SLICE]: combineReducers({
    [CONSTS.ORDERS_SLICE]: ordersReducer,
  }),
};

export { ordersSelectors, ordersActions };
