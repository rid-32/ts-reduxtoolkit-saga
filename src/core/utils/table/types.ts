import { AnyAction, Reducer, ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { State } from 'core/store';

export type TableSort = {
  field: string;
  dir: 'asc' | 'desc';
};

export type TableState = {
  page: number;
  pageSize: number;
  total: number;
  sort: TableSort;
};

export type TableQueryParams = {
  limit: number;
  offset: number;
  sort: TableSort;
};

export type SliceConfig = {
  domain: string;
  initialState?: Partial<TableState>;
};

export type TableSliceActions = {
  changePage: ActionCreatorWithPayload<number>;
  changePageSize: ActionCreatorWithPayload<number>;
  changeTotal: ActionCreatorWithPayload<number>;
  changeSort: ActionCreatorWithPayload<TableSort>;
};

export type TableSliceSelectors = {
  page: (state: State) => number;
  usePage: () => number;
  pageSize: (state: State) => number;
  usePageSize: () => number;
  total: (state: State) => number;
  useTotal: () => number;
  sort: (state: State) => TableSort;
  useSort: () => TableSort;
  queryParams: (state: State) => TableQueryParams;
  useQueryParams: () => TableQueryParams;
};

export type CreateTableSliceResponse = {
  reducer: Reducer<TableState, AnyAction>;
  actions: TableSliceActions;
  selectors: TableSliceSelectors;
};
