import React, { FC } from 'react';

import { useProductsFetching } from './hooks';
import { productsTableSelectors } from 'models/producers';

const Products: FC = () => {
  const isInitialState = productsTableSelectors.useIsInitial();
  const isProductsFetching = productsTableSelectors.useIsPending();
  const products = productsTableSelectors.usePayload() || [];
  // const changePageAndFetch = productsDataTableActions.useChangePageAndFetch();
  //
  // const handleNextClick = useCallback(() => {
  //
  // }, [])

  useProductsFetching();

  return (
    <div>
      {isInitialState || isProductsFetching ? (
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
