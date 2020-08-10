import React, { useEffect } from 'react';

import { ordersSelectors, ordersActions } from 'core/sellers';

const Orders: React.FC = () => {
  const isFetching = ordersSelectors.useIsFetching();
  const fetch = ordersActions.useFetch();

  useEffect(() => {
    fetch(undefined, {
      handleSuccess: async ({ data }, dispatch) => {
        return data;
      },
    });
  }, []);

  if (isFetching) {
    return <h3>Loading...</h3>;
  }

  return <h3>Orders</h3>;
};

export default Orders;
