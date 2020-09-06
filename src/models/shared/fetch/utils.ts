import { INITIAL_FETCH_STATE } from './consts';
import { FetchState } from './types';

export const getInitialFetchState = <P>(): FetchState<P> => INITIAL_FETCH_STATE;

export const getFetchDomain = (domain: string): string => `${domain}/fetch`;
