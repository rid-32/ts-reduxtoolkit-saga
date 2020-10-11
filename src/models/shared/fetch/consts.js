export const FETCH_STATUSES = {
  INITIAL: 'INITIAL',
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
};

export const INITIAL_FETCH_STATE = {
  status: FETCH_STATUSES.INITIAL,
  payload: null,
  error: null,
};
