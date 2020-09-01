import { combineReducers } from 'redux';

import { createTableSlice } from 'models/shared/table';
import * as CONSTS from './consts';
import { fetchProducts, FetchProductsProps } from 'services/producers';
import { handleProductsFulfilled } from './actions';

const {
  reducer: productsDataTableReducer,
  actions: productsDataTableActions,
  selectors: productsDataTableSelectors,
} = createTableSlice<Product.Element[], FetchProductsProps, Product.Table>({
  domain: CONSTS.PRODUCTS_DOMAIN,
  apiMethod: fetchProducts,
  onSuccess: handleProductsFulfilled,
  initialTableState: {
    pageSize: 3,
  },
});

export const reducer = {
  [CONSTS.PRODUCERS_SLICE]: combineReducers({
    [CONSTS.PRODUCTS_SLICE]: productsDataTableReducer,
  }),
};

export { productsDataTableActions, productsDataTableSelectors };
