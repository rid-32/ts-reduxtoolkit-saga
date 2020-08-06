declare namespace Api {
  type TableData<P> = {
    data: P;
    total: number;
  };

  type Response<P> = {
    data: P;
  };
}
