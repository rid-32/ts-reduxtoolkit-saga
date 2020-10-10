import { useDispatch } from 'react-redux';

import { ordersActions, ordersTableActions } from './slice';

const fetchOrders = () =>
  ordersActions.fetchThunk(null, {
    onSuccess: async ({ apiResponse, dispatch }) => {
      dispatch(ordersTableActions.changeTotal(apiResponse.total));

      return apiResponse.data;
    },
  });

const useFetchOrders = () => {
  const dispatch = useDispatch();

  return () => dispatch(fetchOrders());
};

export default {
  ...ordersActions,
  ...ordersTableActions,
  fetchOrders,
  useFetchOrders,
};
