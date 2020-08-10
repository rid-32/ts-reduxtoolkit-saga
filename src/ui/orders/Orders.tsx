import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'core/sellers';

const Orders: React.FC = () => {
  const areOrdersFetching = ordersSelectors.useIsFetching();
  const fetchOrders = ordersActions.useFetch();

  useEffect(() => {
    fetchOrders(undefined, {
      handleSuccess: async ({ data }, dispatch) => {
        return data;
      },
    });
  }, []);

  if (areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
