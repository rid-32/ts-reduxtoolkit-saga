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

export const fetchOrders = (): Promise<Order.Table> =>
  new Promise((res): void => {
    setTimeout((): void => {
      res({ data: orders, total: orders.length });
    }, 2000);
  });
