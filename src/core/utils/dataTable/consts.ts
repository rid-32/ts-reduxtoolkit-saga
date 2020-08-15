export const TABLE_SLICE = 'table';
export const DATA_SLICE = 'data';

export const getDataDomain = (domain: string) => `${domain}.${DATA_SLICE}`;
export const getTableDomain = (domain: string) => `${domain}.${TABLE_SLICE}`;
//
// export const FETCH = 'dataTable@FETCH';
// export const CHANGE_PAGE = 'dataTable@CHANGE_PAGE';
// export const CHANGE_PAGE_AND_FETCH = 'dataTable@CHANGE_PAGE_AND_FETCH';
// export const CHANGE_PAGE_SIZE = 'dataTable@CHANGE_PAGE_SIZE';
// export const CHANGE_PAGE_SIZE_AND_FETCH =
//   'dataTable@CHANGE_PAGE_SIZE_AND_FETCH';
// export const CHANGE_SORT = 'dataTable@CHANGE_SORT';
// export const CHANGE_SORT_AND_FETCH = 'dataTable@CHANGE_SORT_AND_FETCH';
