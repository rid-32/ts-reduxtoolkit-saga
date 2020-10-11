import React, { FC, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { ordersSelectors, ordersActions } from 'models/sellers';

const Orders: FC = () => {
  const dispatch = useDispatch();
  const isInitialState = ordersSelectors.useIsInitial();
  const areOrdersFetching = ordersSelectors.useIsPending();
  const fetchOrders = ordersActions.useFetchOrders();
  // const fetchOrders = ordersActions.useFetchSaga();

  const handleClick = useCallback(() => {
    dispatch({ type: 'SAGA_AFTER_FETCH_SAGA' });
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isInitialState || areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h3>Orders</h3>

      <button onClick={handleClick}>Press Me</button>
    </div>
  );
};

export default Orders;
