import { useDispatch } from 'react-redux';

import { ordersActions, ordersTableActions } from './slice';
import { Order, OrdersTable } from './types';
import { OnSuccessRequired } from 'models/shared';

const onOrdersSuccess: OnSuccessRequired<Order[], void, OrdersTable> = async ({
  apiResponse,
  dispatch,
}) => {
  const { data, total } = apiResponse;

  dispatch(ordersTableActions.changeTotal(total));

  return data;
};

export const fetchOrders = () => {
  return ordersActions.fetchThunk(null, {
    onSuccess: onOrdersSuccess,
  });
};

export const useFetchOrders = () => {
  const dispatch = useDispatch();

  return () => dispatch(fetchOrders());
};
