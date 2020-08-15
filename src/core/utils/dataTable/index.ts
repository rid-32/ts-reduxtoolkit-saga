import { combineReducers } from 'redux';

import { createFetchSlice } from 'core/utils/fetch';
import { createTableSlice } from 'core/utils/table';
import {
  SliceOptionalConfig,
  SliceRequiredConfig,
  CreateDataTableSliceResponse,
} from './types';
import * as CONSTS from './consts';

function createDataTableSlice<P, A = void>(
  config: SliceOptionalConfig<P, A>,
): CreateDataTableSliceResponse<P, A>;
function createDataTableSlice<P, A, R>(
  config: SliceRequiredConfig<P, A, R>,
): CreateDataTableSliceResponse<P, A>;
function createDataTableSlice<P, A, R>(config: any): any {
  const {
    reducer: fetchReducer,
    selectors: fetchSelectors,
    actions: fetchActions,
  } = createFetchSlice<P, A, R>({
    domain: CONSTS.getDataDomain(config.domain),
    apiMethod: config.apiMethod,
    onFulfilled: config.onFulfilled,
    onRejected: config.onRejected,
    initialState: config.initialDataState,
  });

  const {
    reducer: tableReducer,
    selectors: tableSelectors,
    actions: tableActions,
  } = createTableSlice({
    domain: CONSTS.getTableDomain(config.domain),
    initialState: config.initialTableState,
  });

  const reducer = combineReducers({
    [CONSTS.DATA_SLICE]: fetchReducer,
    [CONSTS.TABLE_SLICE]: tableReducer,
  });

  const selectors = {
    ...fetchSelectors,
    ...tableSelectors,
  };

  const actions = {
    ...fetchActions,
    ...tableActions,
  };

  return { reducer, selectors, actions };
}

export { createDataTableSlice };
