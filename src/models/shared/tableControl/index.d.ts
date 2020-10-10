import {
  Reducer,
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Selector,
} from '@reduxjs/toolkit';

import { State } from 'models/store';

type TableSort = {
  field: string | null;
  dir: 'asc' | 'desc' | null;
};

type TableControlState = {
  page: number;
  pageSize: number;
  total: number;
  sort: TableSort;
};

type TableQueryParams = {
  limit: number;
  offset: number;
  sort: TableSort;
};

type TableControlSliceConfig = {
  domain: string;
  initialState?: Partial<TableControlState>;
};

type CreateTableControlSliceResponse = {
  reducer: Reducer<TableControlState>;
  actions: {
    changePage: ActionCreatorWithPayload<number>;
    useChangePage: () => ActionCreatorWithPayload<number>;
    changePageSize: ActionCreatorWithPayload<number>;
    useChangePageSize: () => ActionCreatorWithPayload<number>;
    changeTotal: ActionCreatorWithPayload<number>;
    useChangeTotal: () => ActionCreatorWithPayload<number>;
    changeSort: ActionCreatorWithPayload<TableSort>;
    useChangeSort: () => ActionCreatorWithPayload<TableSort>;
    resetTableControl: ActionCreatorWithoutPayload;
    useResetTableControl: () => ActionCreatorWithoutPayload;
  };
  selectors: {
    page: Selector<State, number>;
    usePage: () => number;
    pageSize: Selector<State, number>;
    usePageSize: () => number;
    total: Selector<State, number>;
    useTotal: () => number;
    sort: Selector<State, TableSort>;
    useSort: () => TableSort;
    queryParams: Selector<State, TableQueryParams>;
    useQueryParams: () => TableQueryParams;
  };
};

export function createTableControlSlice(
  config: TableControlSliceConfig,
): CreateTableControlSliceResponse;
