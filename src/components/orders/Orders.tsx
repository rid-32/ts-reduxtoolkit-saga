import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'core/sellers';
// import { useBindedAction } from 'utils/hooks';

// const thunkActionCreator = (payload: string) => async (dispatch, getState) => {
//   return payload
// }

const Orders: React.FC = () => {
  const areOrdersFetching = ordersSelectors.useIsFetching();
  const fetchOrders = ordersActions.useFetchThunk();
  // const fetchOrders = useBindedAction(thunkActionCreator);

  useEffect(() => {
    fetchOrders();
  }, []);

  if (areOrdersFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
