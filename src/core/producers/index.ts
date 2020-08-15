import { combineReducers } from 'redux';

import { createDataTableSlice } from 'core/utils/dataTable';
import * as CONSTS from './consts';
import { fetchProducts } from 'api/producers';
import { handleProductsFulfilled } from './actions';

const {
  reducer: productsDataTableReducer,
  actions: productsDataTableActions,
  selectors: productsDataTableSelectors,
} = createDataTableSlice<Product.Element[], void, Product.Table>({
  domain: CONSTS.PRODUCTS_DOMAIN,
  apiMethod: fetchProducts,
  onFulfilled: handleProductsFulfilled,
});

export const reducer = {
  [CONSTS.PRODUCERS_SLICE]: combineReducers({
    [CONSTS.PRODUCTS_SLICE]: productsDataTableReducer,
  }),
};

export { productsDataTableActions, productsDataTableSelectors };
