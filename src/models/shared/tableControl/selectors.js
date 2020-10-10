import { useSelector } from 'react-redux';

import { get } from 'utils/tools';

const getPageSelector = domain => state => {
  return get(state, domain, {}).page;
};

const getPageSizeSelector = domain => state => {
  return get(state, domain, {}).pageSize;
};

const getTotalSelector = domain => state => {
  return get(state, domain, {}).total;
};

const getSortSelector = domain => state => {
  return get(state, domain, {}).sort;
};

const getQueryParamsSelector = domain => state => {
  const page = getPageSelector(domain)(state);
  const pageSize = getPageSizeSelector(domain)(state);
  const sort = getSortSelector(domain)(state);

  return {
    limit: pageSize,
    offset: page * pageSize,
    sort,
  };
};

export const getTableControlSelectors = domain => {
  const pageSelector = getPageSelector(domain);
  const pageSizeSelector = getPageSizeSelector(domain);
  const totalSelector = getTotalSelector(domain);
  const sortSelector = getSortSelector(domain);
  const queryParamsSelector = getQueryParamsSelector(domain);

  return {
    page: pageSelector,
    usePage: () => useSelector(pageSelector),
    pageSize: pageSizeSelector,
    usePageSize: () => useSelector(pageSizeSelector),
    total: totalSelector,
    useTotal: () => useSelector(totalSelector),
    sort: sortSelector,
    useSort: () => useSelector(sortSelector),
    queryParams: queryParamsSelector,
    useQueryParams: () => useSelector(queryParamsSelector),
  };
};
