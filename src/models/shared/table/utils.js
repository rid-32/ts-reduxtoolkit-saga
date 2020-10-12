import { DATA_SLICE, TABLE_CONTROL_SLICE } from './consts';

export const getDataDomain = domain => `${domain}.${DATA_SLICE}`;

export const getTableControlDomain = domain =>
  `${domain}.${TABLE_CONTROL_SLICE}`;

export const getChangePageAndFetchDomain = domain =>
  `${domain}/changePageAndFetch`;

export const getChangePageSizeAndFetchDomain = domain =>
  `${domain}/changePageSizeAndFetch`;

export const getChangeTotalAndFetchDomain = domain =>
  `${domain}/changeTotalAndFetch`;

export const getChangeSortAndFetchDomain = domain =>
  `${domain}/changeSortAndFetch`;
