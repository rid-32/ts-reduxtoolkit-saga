import { TableControlSliceActions, OnFulfilledProps } from 'models/shared';
import { FetchProductsProps } from 'services/producers';

export const handleProductsFulfilled = (
  actions: TableControlSliceActions,
) => async ({
  apiResponse,
  dispatch,
}: OnFulfilledProps<FetchProductsProps, Product.Table>) => {
  const { data, total } = apiResponse;

  dispatch(actions.changeTotal(total));

  return data;
};
