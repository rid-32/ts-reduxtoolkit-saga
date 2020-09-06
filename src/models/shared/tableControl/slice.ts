import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  TableControlSliceConfig,
  TableSort,
  CreateTableControlSliceResponse,
} from './types';
import { INITIAL_TABLE_CONTROL_STATE } from './consts';
import { getTableControlSelectors } from './selectors';

export const createTableControlSlice = (
  config: TableControlSliceConfig,
): CreateTableControlSliceResponse => {
  const { reducer, actions } = createSlice({
    name: config.domain,
    initialState: {
      ...INITIAL_TABLE_CONTROL_STATE,
      ...(config.initialState || {}),
    },
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
      reset: () => INITIAL_TABLE_CONTROL_STATE,
    },
  });

  const selectors = getTableControlSelectors(config.domain);

  return {
    reducer,
    actions,
    selectors,
  };
};
