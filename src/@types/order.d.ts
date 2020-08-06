declare namespace Order {
  type Element = {
    id: string;
    amount: number;
  };

  type Table = Api.TableData<Element[]>;
}
