import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SliceConfig, TableSort, CreateTableSliceResponse } from './types';
import { INITIAL_TABLE_STATE } from './consts';
import { getTableSelectors } from './selectors';

export const createTableSlice = (
  config: SliceConfig,
): CreateTableSliceResponse => {
  const { reducer, actions } = createSlice({
    name: config.domain,
    initialState: { ...INITIAL_TABLE_STATE, ...(config.initialState || {}) },
    reducers: {
      changePage: (state, { payload }: PayloadAction<number>) => {
        state.page = payload;
      },
      changePageSize: (state, { payload }: PayloadAction<number>) => {
        state.pageSize = payload;
      },
      changeTotal: (state, { payload }: PayloadAction<number>) => {
        state.total = payload;
      },
      changeSort: (state, { payload }: PayloadAction<TableSort>) => {
        state.sort = payload;
      },
      reset: () => INITIAL_TABLE_STATE,
    },
  });

  const selectors = getTableSelectors(config.domain);

  return {
    reducer,
    actions,
    selectors,
  };
};
