import { combineReducers } from 'redux';

import { createFetchSlice } from 'core/utils/fetch';
import * as CONSTS from './consts';
import { fetchOrders } from 'api/sellers';

const {
  reducer: ordersReducer,
  selectors: ordersSelectors,
  actions: ordersActions,
} = createFetchSlice<Order.Element[], void, Order.Table>({
  domain: CONSTS.ORDERS_DOMAIN,
  apiMethod: fetchOrders,
  onFulfilled: async ({ apiResponse }) => {
    const { data, total } = apiResponse;

    console.log({ total });

    return data;
  },
});

export const reducers = {
  [CONSTS.SELLERS_SLICE]: combineReducers({
    [CONSTS.ORDERS_SLICE]: ordersReducer,
  }),
};

export { ordersSelectors, ordersActions };
