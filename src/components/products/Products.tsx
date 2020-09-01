import React, { FC, useCallback } from 'react';

import { useProductsFetching } from './hooks';
import {
  productsDataTableSelectors,
  productsDataTableActions,
} from 'models/producers';

const Products: FC = () => {
  const isProductsFetching = productsDataTableSelectors.useIsFetching();
  const products = productsDataTableSelectors.usePayload() || [];
  // const changePageAndFetch = productsDataTableActions.useChangePageAndFetch();
  //
  // const handleNextClick = useCallback(() => {
  //
  // }, [])

  useProductsFetching();

  return (
    <div>
      {isProductsFetching ? (
        <h3>Загрузка...</h3>
      ) : (
        <>
          <ul>
            {products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>

          <button>Next</button>
        </>
      )}
    </div>
  );
};

export default Products;
