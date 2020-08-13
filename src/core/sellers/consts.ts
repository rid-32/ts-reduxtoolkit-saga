export const SELLERS_SLICE = 'sellers';
export const ORDERS_SLICE = 'orders';
export const ORDERS_TABLE_SLICE = 'ordersTable';

export const ORDERS_DOMAIN = `${SELLERS_SLICE}.${ORDERS_SLICE}`;
export const ORDERS_TABLE_DOMAIN = `${SELLERS_SLICE}.${ORDERS_TABLE_SLICE}`;

export const ORDERS_TABLE_INITIAL_STATE = {
  sort: {
    field: 'name',
    dir: 'desc' as const,
  },
};
