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
];

export const fetchProducts = (): Promise<Product.Table> =>
  new Promise((res): void => {
    setTimeout((): void => {
      res({ data: products, total: products.length });
    }, 2000);
  });
