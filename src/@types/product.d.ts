declare namespace Product {
  type Element = {
    id: string;
    name: string;
    price: number;
  };

  type Table = Api.TableData<Element[]>;
}
