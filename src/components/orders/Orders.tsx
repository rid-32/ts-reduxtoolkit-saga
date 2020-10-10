import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'models/sellers';

const Orders: React.FC = () => {
  const isInitialState = ordersSelectors.useIsInitial();
  const areOrdersFetching = ordersSelectors.useIsPending();
  const fetchOrders = ordersActions.useFetchOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isInitialState || areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
