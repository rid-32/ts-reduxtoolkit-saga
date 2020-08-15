import { DataTableSliceActions, OnFulfilledProps } from 'core/utils';

export const handleProductsFulfilled = (
  actions: DataTableSliceActions<Product.Element[], void>,
) => async ({
  apiResponse,
  dispatch,
}: OnFulfilledProps<void, Product.Table>) => {
  const { data, total } = apiResponse;

  dispatch(actions.changeTotal(total));

  return data;
};
