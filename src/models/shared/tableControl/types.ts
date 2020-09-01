import { AnyAction, Reducer, ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { State } from 'models/store';

export type TableSort = {
  field: string;
  dir: 'asc' | 'desc';
};

export type TableControlState = {
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

export type TableControlSliceConfig = {
  domain: string;
  initialState?: Partial<TableControlState>;
};

export type TableControlSliceActions = {
  changePage: ActionCreatorWithPayload<number>;
  changePageSize: ActionCreatorWithPayload<number>;
  changeTotal: ActionCreatorWithPayload<number>;
  changeSort: ActionCreatorWithPayload<TableSort>;
};

export type TableControlSliceSelectors = {
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

export type CreateTableControlSliceResponse = {
  reducer: Reducer<TableControlState, AnyAction>;
  actions: TableControlSliceActions;
  selectors: TableControlSliceSelectors;
};
