import { Reducer, AnyAction } from '@reduxjs/toolkit';

import {
  SliceOptionalConfig as FetchSliceOptionalConfig,
  SliceRequiredConfig as FetchSliceRequiredConfig,
  FetchState,
  FetchSliceActions,
  FetchSliceSelectors,
  OnRejected,
  OnFulfilledOptional,
  OnFulfilledRequired,
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

type CommonConfig<P, A> = {
  initialDataState?: FetchState<P>;
  initialTableState?: TableState;
  onRejected?: OnRejected<A>;
};

export type SliceOptionalConfig<P, A> = Omit<
  FetchSliceOptionalConfig<P, A>,
  'initialState' | 'onFulfilled' | 'onRejected'
> &
  CommonConfig<P, A> & {
    onFulfilled?: (arg0: TableSliceActions) => OnFulfilledOptional<A, P>;
  };

export type SliceRequiredConfig<P, A, R> = Omit<
  FetchSliceRequiredConfig<P, A, R>,
  'initialState' | 'onFulfilled' | 'onRejected'
> &
  CommonConfig<P, A> & {
    onFulfilled: (arg0: TableSliceActions) => OnFulfilledRequired<P, A, R>;
  };

export type DataTableSliceActions<P, A> = FetchSliceActions<P, A> &
  TableSliceActions;

export type DataTableSliceSelectors<P> = FetchSliceSelectors<P> &
  TableSliceSelectors;

export type CreateDataTableSliceResponse<P, A> = {
  reducer: Reducer<DataTableState<P>, AnyAction>;
  actions: DataTableSliceActions<P, A>;
  selectors: DataTableSliceSelectors<P>;
};
