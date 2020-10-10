import { INITIAL_FETCH_STATE } from './consts';

export const getInitialFetchState = () => INITIAL_FETCH_STATE;

export const getFetchDomain = domain => `${domain}/fetch`;
