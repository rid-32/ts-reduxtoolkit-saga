import { useSelector } from 'react-redux';

import { get } from 'utils/tools';
import { FETCH_STATUSES } from './consts';

const getIsInitialSelector = domain => state => {
  const status = get(state, domain, {}).status;

  return status === FETCH_STATUSES.INITIAL;
};

const getIsPendingSelector = domain => state => {
  const status = get(state, domain, {}).status;

  return status === FETCH_STATUSES.PENDING;
};

const getIsSuccessSelector = domain => state => {
  const status = get(state, domain, {}).status;

  return status === FETCH_STATUSES.SUCCESS;
};

const getIsFailureSelector = domain => state => {
  const status = get(state, domain, {}).status;

  return status === FETCH_STATUSES.FAILURE;
};

const getPayloadSelector = domain => state => {
  return get(state, domain, {}).payload;
};

const getErrorSelector = domain => state => {
  return get(state, domain, {}).error;
};

export const getFetchSelectors = domain => {
  const isInitialSelector = getIsInitialSelector(domain);
  const isPendingSelector = getIsPendingSelector(domain);
  const isSuccessSelector = getIsSuccessSelector(domain);
  const isFailureSelector = getIsFailureSelector(domain);
  const payloadSelector = getPayloadSelector(domain);
  const errorSelector = getErrorSelector(domain);

  return {
    isInitial: isInitialSelector,
    useIsInitial: () => useSelector(isInitialSelector),
    isPending: isPendingSelector,
    useIsPending: () => useSelector(isPendingSelector),
    isSuccess: isSuccessSelector,
    useIsSuccess: () => useSelector(isSuccessSelector),
    isFailure: isFailureSelector,
    useIsFailure: () => useSelector(isFailureSelector),
    payload: payloadSelector,
    usePayload: () => useSelector(payloadSelector),
    error: errorSelector,
    useError: () => useSelector(errorSelector),
  };
};
