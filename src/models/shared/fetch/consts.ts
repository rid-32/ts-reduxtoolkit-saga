import { FetchState } from './types';

export const INITIAL_FETCH_STATE: FetchState = {
  status: 'INITIAL',
  payload: null,
  error: null,
};
