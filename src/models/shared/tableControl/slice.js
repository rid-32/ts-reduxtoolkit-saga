import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { INITIAL_TABLE_CONTROL_STATE } from './consts';
import { getTableControlSelectors } from './selectors';

export const createTableControlSlice = config => {
  const { reducer, actions } = createSlice({
    name: config.domain,
    initialState: {
      ...INITIAL_TABLE_CONTROL_STATE,
      ...(config.initialState || {}),
    },
    reducers: {
      changePage: (state, { payload }) => {
        state.page = payload;
      },
      changePageSize: (state, { payload }) => {
        state.pageSize = payload;
      },
      changeTotal: (state, { payload }) => {
        state.total = payload;
      },
      changeSort: (state, { payload }) => {
        state.sort = payload;
      },
      resetTableControl: state => {
        state.page = INITIAL_TABLE_CONTROL_STATE.page;
        state.pageSize = INITIAL_TABLE_CONTROL_STATE.pageSize;
        state.total = INITIAL_TABLE_CONTROL_STATE.total;
        state.sort = INITIAL_TABLE_CONTROL_STATE.sort;
      },
    },
  });

  const selectors = getTableControlSelectors(config.domain);

  return {
    reducer,
    actions: {
      ...actions,
      useChangePage: () => {
        const dispatch = useDispatch();

        return payload => dispatch(actions.changePage(payload));
      },
      useChangePageSize: () => {
        const dispatch = useDispatch();

        return payload => dispatch(actions.changePageSize(payload));
      },
      useChangeTotal: () => {
        const dispatch = useDispatch();

        return payload => dispatch(actions.changeTotal(payload));
      },
      useChangeSort: () => {
        const dispatch = useDispatch();

        return payload => dispatch(actions.changeSort(payload));
      },
      useResetTableControl: () => {
        const dispatch = useDispatch();

        return () => dispatch(actions.resetTableControl());
      },
    },
    selectors,
  };
};
