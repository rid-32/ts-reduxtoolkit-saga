import { useDispatch } from 'react-redux';

import {
  ordersActions as ordersSliceActions,
  ordersTableActions as ordersSliceTableActions,
} from './slice';
import { Order, OrdersTable } from './types';
import { OnSuccessRequired } from 'models/shared';

const onOrdersSuccess: OnSuccessRequired<Order[], void, OrdersTable> = async ({
  apiResponse,
  dispatch,
}) => {
  const { data, total } = apiResponse;

  dispatch(ordersSliceTableActions.changeTotal(total));

  return data;
};

const fetchOrders = () => {
  return ordersSliceActions.fetchThunk(null, {
    onSuccess: onOrdersSuccess,
  });
};

const useFetchOrders = () => {
  const dispatch = useDispatch();

  return () => dispatch(fetchOrders());
};

export const ordersActions = {
  fetchOrders,
  useFetchOrders,
};
