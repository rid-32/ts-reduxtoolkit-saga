export const INITIAL_FETCH_STATE: Core.FetchState<null> = {
  isFetching: false,
  isFetched: false,
  payload: null,
  error: null,
};

export const getInitialFetchState = <P>(): Core.FetchState<P> =>
  INITIAL_FETCH_STATE;

export const getFetchDomain = (domain: string): string => `${domain}/fetch`;
