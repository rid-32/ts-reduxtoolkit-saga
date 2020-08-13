import { TableSliceActions, OnFulfilledProps } from 'core/utils';

export const getOrdersFulfilledHandler = (
  actions: TableSliceActions,
) => async ({ apiResponse, dispatch }: OnFulfilledProps<void, Order.Table>) => {
  const { data, total } = apiResponse;

  dispatch(actions.changeTotal(total));

  return data;
};
