import { TableControlState } from './types';

export const INITIAL_TABLE_CONTROL_STATE: TableControlState = {
  page: 0,
  pageSize: 10,
  total: 0,
  sort: {
    field: null,
    dir: null,
  },
};
