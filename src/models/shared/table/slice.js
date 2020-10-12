import { combineReducers } from 'redux';

import { createFetchSlice } from '../fetch';
import { createTableControlSlice } from '../tableControl';
import { getDataDomain, getTableControlDomain } from './utils';
import { DATA_SLICE, TABLE_CONTROL_SLICE } from './consts';
import { getTableActions } from './actions';

export const createTableSlice = config => {
  const {
    reducer: fetchReducer,
    actions: fetchActions,
    selectors: fetchSelectors,
  } = createFetchSlice({
    domain: getDataDomain(config.domain),
    apiMethod: config.apiMethod,
  });

  const {
    reducer: tableControlReducer,
    actions: tableControlActions,
    selectors: tableControlSelectors,
  } = createTableControlSlice({
    domain: getTableControlDomain(config.domain),
  });

  const reducer = combineReducers({
    [DATA_SLICE]: fetchReducer,
    [TABLE_CONTROL_SLICE]: tableControlReducer,
  });

  const actions = getTableActions({
    domain: config.domain,
    fetchActions,
    tableControlActions,
  });

  return {
    reducer,
    actions,
    // fetchSelectors,
    // tableControlSelectors,
  };
};
