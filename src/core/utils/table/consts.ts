import { TableState } from './types';

export const INITIAL_TABLE_STATE: TableState = {
  page: 0,
  pageSize: 10,
  total: 0,
  sort: {
    field: null,
    dir: null,
  },
};
