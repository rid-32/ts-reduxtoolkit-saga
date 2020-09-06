import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'models/sellers';
// import { useBindedAction } from 'utils/hooks';

// const thunkActionCreator = (payload: string) => async (dispatch, getState) => {
//   return payload
// }

const Orders: React.FC = () => {
  const isInitialState = ordersSelectors.useIsInitial();
  const areOrdersFetching = ordersSelectors.useIsPending();
  const fetchOrders = ordersActions.useFetchThunk();
  // const fetchOrders = useBindedAction(thunkActionCreator);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (isInitialState || areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
