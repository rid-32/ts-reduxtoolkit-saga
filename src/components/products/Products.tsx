import React, { FC } from 'react';

import { useProductsFetching } from './hooks';
import { productsDataTableSelectors } from 'core/producers';

const Products: FC = () => {
  const isProductsFetching = productsDataTableSelectors.useIsFetching();
  const products = productsDataTableSelectors.usePayload() || [];

  useProductsFetching();

  return (
    <div>
      {isProductsFetching ? (
        <h3>Загрузка...</h3>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Products;
