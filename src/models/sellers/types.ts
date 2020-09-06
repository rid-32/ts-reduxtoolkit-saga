import { TableData } from 'services/types';

export type Order = {
  id: string;
  amount: number;
};

export type OrdersTable = TableData<Order[]>;
