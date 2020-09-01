import { TableControlSliceActions, OnFulfilledProps } from 'models/shared';

export const getOrdersFulfilledHandler = (
  actions: TableControlSliceActions,
) => async ({ apiResponse, dispatch }: OnFulfilledProps<void, Order.Table>) => {
  const { data, total } = apiResponse;

  dispatch(actions.changeTotal(total));

  return data;
};
