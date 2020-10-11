import { useDispatch } from 'react-redux';

import { ordersActions, ordersTableActions } from './slice';
import { SuccessThunk } from 'models/shared';

const ordersSuccessFetch: SuccessThunk<typeof ordersActions.fetchThunk> = async ({
  apiResponse,
  dispatch,
}) => {
  dispatch(ordersTableActions.changeTotal(apiResponse.total));

  return apiResponse.data;
};

const fetchOrders = () =>
  ordersActions.fetchThunk(null, {
    preProcess: () => 'hi',
    onSuccess: ordersSuccessFetch,
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
