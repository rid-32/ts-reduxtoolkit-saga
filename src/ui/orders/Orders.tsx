import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'core/sellers';

const Orders: React.FC = () => {
  const areOrdersFetching = ordersSelectors.useIsFetching();
  const fetchOrders = ordersActions.useFetch();

  useEffect(() => {
    fetchOrders(undefined, {
      handleSuccess: async ({ data }) => {
        return data;
      },
      handleError: async error => {
        throw new Error(`Origin error: ${error.message}`);
      },
    });
  }, []);

  if (areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
