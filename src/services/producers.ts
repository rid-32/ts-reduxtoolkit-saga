import { TableQueryParams } from 'models/shared/tableControl/types';

const products: Product.Element[] = [
  {
    id: '1',
    name: 'banana',
    price: 59,
  },
  {
    id: '2',
    name: 'potato',
    price: 25,
  },
  {
    id: '3',
    name: 'avocado',
    price: 81,
  },
  {
    id: '4',
    name: 'cucumber',
    price: 40,
  },
  {
    id: '5',
    name: 'pineapple',
    price: 120,
  },
  {
    id: '6',
    name: 'bread',
    price: 15,
  },
];

const getProductsByParams = (params: TableQueryParams): Product.Element[] =>
  products.reduce((acc, product, index) => {
    if (index < params.offset || index > params.offset + params.limit)
      return acc;

    return [...acc, product];
  }, []);

export type FetchProductsProps = {
  params?: TableQueryParams;
};

export const fetchProducts = ({
  params,
}: FetchProductsProps): Promise<Product.Table> =>
  new Promise((res): void => {
    setTimeout((): void => {
      res({ data: getProductsByParams(params), total: products.length });
    }, 2000);
  });
