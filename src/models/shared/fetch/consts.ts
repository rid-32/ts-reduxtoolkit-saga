import { FetchState } from './types';

export const INITIAL_FETCH_STATE: FetchState<null> = {
  status: 'INITIAL',
  payload: null,
  error: null,
};
