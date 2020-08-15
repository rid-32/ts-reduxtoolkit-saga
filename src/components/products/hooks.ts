import React from 'react';

import { productsDataTableActions } from 'core/producers';

export const useProductsFetching = (): void => {
  const fetchProducts = productsDataTableActions.useFetchThunk();

  React.useEffect(() => {
    fetchProducts();
  }, []);
};
