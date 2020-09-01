import React from 'react';

import {
  productsDataTableActions,
  productsDataTableSelectors,
} from 'models/producers';

export const useProductsFetching = (): void => {
  const fetchProducts = productsDataTableActions.useFetchThunk();
  const queryParams = productsDataTableSelectors.useQueryParams();

  React.useEffect(() => {
    fetchProducts({ params: queryParams });
  }, []);
};
