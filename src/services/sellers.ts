import { OrdersTable, Order } from 'models/sellers/types';

const orders = [
  {
    id: '1',
    amount: 50,
  },
  {
    id: '2',
    amount: 25,
  },
  {
    id: '3',
    amount: 15,
  },
];

// export const fetchOrders = (): Promise<Order[]> =>
export const fetchOrders = (arg: string): Promise<OrdersTable> => {
  console.log({ arg });

  return new Promise((res, rej): void => {
    setTimeout((): void => {
      res({ data: orders, total: orders.length });
      // res(orders);
      // rej(new Error('Some json'));
    }, 2000);
  });
};
