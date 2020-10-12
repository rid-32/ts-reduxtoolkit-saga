import { createAsyncThunk } from '@reduxjs/toolkit';

import { getChangePageAndFetchDomain } from './utils';

const getChangePageAndFetchThunk = ({
  domain,
  fetchActions,
  tableControlActions,
}) => {
  return createAsyncThunk(
    getChangePageAndFetchDomain(domain),
    async ({ payload, ...config }, { dispatch }) => {
      dispatch(tableControlActions.changePage(payload));

      return await dispatch(fetchActions.fetchThunk(null, config));
    },
  );
};

const getChangePageAndFetchThunkWrapper = config => {
  const changePageAndFetchThunk = getChangePageAndFetchThunk(config);

  return (payload, config) => {
    return changePageAndFetchThunk({
      payload,
      ...config,
    });
  };
};

export const getTableActions = config => ({
  ...config.fetchActions,
  ...config.tableControlActions,
  changePageAndFetch: getChangePageAndFetchThunkWrapper(config),
});
