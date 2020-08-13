import { useSelector } from 'react-redux';

import { get } from 'utils/tools';
import { TableSort, TableQueryParams } from './types';
import { State } from 'core/store';

const getPageSelector = (domain: string) => (state: State): number => {
  return get(state, domain, {}).page;
};

const getPageSizeSelector = (domain: string) => (state: State): number => {
  return get(state, domain, {}).pageSize;
};

const getTotalSelector = (domain: string) => (state: State): number => {
  return get(state, domain, {}).total;
};

const getSortSelector = (domain: string) => (state: State): TableSort => {
  return get(state, domain, {}).sort;
};

const getQueryParamsSelector = (domain: string) => (
  state: State,
): TableQueryParams => {
  const page = getPageSelector(domain)(state);
  const pageSize = getPageSizeSelector(domain)(state);
  const sort = getSortSelector(domain)(state);

  return {
    limit: pageSize,
    offset: page * pageSize,
    sort,
  };
};

export const getTableSelectors = (domain: string) => {
  const pageSelector = getPageSelector(domain);
  const pageSizeSelector = getPageSizeSelector(domain);
  const totalSelector = getTotalSelector(domain);
  const sortSelector = getSortSelector(domain);
  const queryParamsSelector = getQueryParamsSelector(domain);

  return {
    page: pageSelector,
    usePage: (): number => useSelector(pageSelector),
    pageSize: pageSizeSelector,
    usePageSize: (): number => useSelector(pageSizeSelector),
    total: totalSelector,
    useTotal: (): number => useSelector(totalSelector),
    sort: sortSelector,
    useSort: (): TableSort => useSelector(sortSelector),
    queryParams: queryParamsSelector,
    useQueryParams: (): TableQueryParams => useSelector(queryParamsSelector),
  };
};
