import { Reducer, AnyAction } from '@reduxjs/toolkit';

import {
  SliceOptionalConfig as FetchSliceOptionalConfig,
  SliceRequiredConfig as FetchSliceRequiredConfig,
  FetchState,
  FetchSliceActions,
  FetchSliceSelectors,
} from 'core/utils/fetch/types';
import {
  TableState,
  TableSliceActions,
  TableSliceSelectors,
} from 'core/utils/table/types';

export type DataTableState<P> = {
  data: FetchState<P>;
  table: TableState;
};

type InitialStates<P> = {
  initialDataState?: FetchState<P>;
  initialTableState?: TableState;
};

export type SliceOptionalConfig<P, A> = Omit<
  FetchSliceOptionalConfig<P, A>,
  'initialState'
> &
  InitialStates<P>;

export type SliceRequiredConfig<P, A, R> = Omit<
  FetchSliceRequiredConfig<P, A, R>,
  'initialState'
> &
  InitialStates<P>;

export type DataTableSliceActions<P, A> = FetchSliceActions<P, A> &
  TableSliceActions;

export type DataTableSliceSelectors<P> = FetchSliceSelectors<P> &
  TableSliceSelectors;

export type CreateDataTableSliceResponse<P, A> = {
  reducer: Reducer<DataTableState<P>, AnyAction>;
  actions: DataTableSliceActions<P, A>;
  selectors: DataTableSliceSelectors<P>;
};
