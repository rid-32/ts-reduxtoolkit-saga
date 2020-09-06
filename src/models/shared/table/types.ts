import {
  Reducer,
  AnyAction,
  AsyncThunk,
  AsyncThunkAction,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  SliceOptionalConfig as FetchSliceOptionalConfig,
  SliceRequiredConfig as FetchSliceRequiredConfig,
  FetchState,
  FetchSliceActions,
  FetchSliceSelectors,
  OnFailure,
  OnSuccessOptional,
  OnSuccessRequired,
} from 'models/shared/fetch/types';
import {
  TableControlState,
  TableControlSliceActions,
  TableControlSliceSelectors,
} from 'models/shared/tableControl/types';

export type TableState<P> = {
  fetchedData: FetchState<P>;
  tableControl: TableControlState;
};

type CommonConfig<P, A> = {
  initialDataState?: Partial<FetchState<P>>;
  initialTableState?: Partial<TableControlState>;
  onFailure?: OnFailure<A>;
};

export type SliceOptionalConfig<P, A> = Omit<
  FetchSliceOptionalConfig<P, A>,
  'initialState' | 'onSuccess' | 'onFailure'
> &
  CommonConfig<P, A> & {
    onSuccess?: (arg0: TableControlSliceActions) => OnSuccessOptional<A, P>;
  };

export type SliceRequiredConfig<P, A, R> = Omit<
  FetchSliceRequiredConfig<P, A, R>,
  'initialState' | 'onSuccess' | 'onFailure'
> &
  CommonConfig<P, A> & {
    onSuccess: (arg0: TableControlSliceActions) => OnSuccessRequired<P, A, R>;
  };

export type ChangePageAndFetchArg<A> = {
  page: number;
  arg: A;
};

type ChangePageAndFetch<P, A> = AsyncThunk<
  PayloadAction<P>,
  ChangePageAndFetchArg<A>,
  {}
>;

export type TableSliceActions<P, A> = FetchSliceActions<P, A> &
  TableControlSliceActions & {
    changePageAndFetch: ChangePageAndFetch<P, A>;
    useChangePageAndFetch: () => (
      arg0: ChangePageAndFetchArg<A>,
    ) => AsyncThunkAction<PayloadAction<P>, ChangePageAndFetchArg<A>, {}>;
  };

export type TableSliceSelectors<P> = FetchSliceSelectors<P> &
  TableControlSliceSelectors;

export type CreateTableSliceResponse<P, A> = {
  reducer: Reducer<TableState<P>, AnyAction>;
  actions: TableSliceActions<P, A>;
  selectors: TableSliceSelectors<P>;
};
