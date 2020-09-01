export const TABLE_CONTROL_SLICE = 'tableControl';
export const FETCHED_DATA_SLICE = 'fetchedData';

export const getFetchedDataDomain = (domain: string) =>
  `${domain}.${FETCHED_DATA_SLICE}`;

export const getTableControlDomain = (domain: string) =>
  `${domain}.${TABLE_CONTROL_SLICE}`;

export const getChangePageAndFetchDomain = (domain: string) =>
  `${domain}/changePageAndFetch`;

export const getChangePageSizeAndFetchDomain = (domain: string) =>
  `${domain}/changePageSizeAndFetch`;

export const getChangeTotalAndFetchDomain = (domain: string) =>
  `${domain}/changeTotalAndFetch`;

export const getChangeSortAndFetchDomain = (domain: string) =>
  `${domain}/changeSortAndFetch`;
