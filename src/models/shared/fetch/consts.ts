import { FetchState } from './types';

export const INITIAL_FETCH_STATE: FetchState<null> = {
  status: 'INITIAL',
  payload: null,
  error: null,
};

export const getInitialFetchState = <P>(): FetchState<P> => INITIAL_FETCH_STATE;

export const getFetchDomain = (domain: string): string => `${domain}/fetch`;
