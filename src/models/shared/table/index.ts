// import { combineReducers } from 'redux';
//
// import { createFetchSlice } from 'models/shared/fetch';
// import { createTableControlSlice } from 'models/shared/tableControl';
// import {
//   SliceOptionalConfig,
//   SliceRequiredConfig,
//   CreateTableSliceResponse,
// } from './types';
// import * as CONSTS from './consts';
// import { getDataTableActions } from './actions';
//
// function createTableSlice<P, A = void>(
//   config: SliceOptionalConfig<P, A>,
// ): CreateTableSliceResponse<P, A>;
// function createTableSlice<P, A, R>(
//   config: SliceRequiredConfig<P, A, R>,
// ): CreateTableSliceResponse<P, A>;
// function createTableSlice<P, A, R>(config: any): any {
//   const {
//     reducer: tableReducer,
//     selectors: tableSelectors,
//     actions: tableActions,
//   } = createTableControlSlice({
//     domain: CONSTS.getTableControlDomain(config.domain),
//     initialState: config.initialTableState,
//   });
//
//   const fetchConfig = {
//     domain: CONSTS.getFetchedDataDomain(config.domain),
//     apiMethod: config.apiMethod,
//     onSuccess: config.onSuccess,
//     onFailure: config.onFailure,
//     initialState: config.initialDataState,
//   };
//
//   if (config.onFulfilled) {
//     fetchConfig.onSuccess = config.onSuccess(tableActions);
//   }
//
//   if (config.onRejected) {
//     fetchConfig.onFailure = config.onFailure(tableActions);
//   }
//
//   const {
//     reducer: fetchReducer,
//     selectors: fetchSelectors,
//     actions: fetchActions,
//   } = createFetchSlice<P, A, R>(fetchConfig);
//
//   const reducer = combineReducers({
//     [CONSTS.FETCHED_DATA_SLICE]: fetchReducer,
//     [CONSTS.TABLE_CONTROL_SLICE]: tableReducer,
//   });
//
//   const selectors = {
//     ...fetchSelectors,
//     ...tableSelectors,
//   };
//
//   const actions = getDataTableActions(
//     config.domain,
//     fetchActions,
//     tableActions,
//   );
//
//   return { reducer, selectors, actions };
// }
//
// export { createTableSlice };
