import { useSelector } from 'react-redux';

import { get } from 'utils/tools';

const getIsFetchedSelector = (domain: string) => (state): boolean => {
  return get(state, domain, {}).isFetched;
};

const getIsFetchingSelector = (domain: string) => (state): boolean => {
  const isFetching = get(state, domain, {}).isFetching;
  const isFetched = getIsFetchedSelector(domain)(state);

  return isFetching || !isFetched;
};

const getPayloadSelector = <P>(domain: string, defaultValue: P = null) => (
  state,
): P => {
  return get(state, domain, {}).payload || defaultValue;
};

const getErrorSelector = (domain: string, defaultValue: string = null) => (
  state,
): string => {
  return get(state, domain, {}).error || defaultValue;
};

export const getFetchSelectors = <P>(domain: string) => {
  const isFetchingSelector = getIsFetchingSelector(domain);
  const isFetchedSelector = getIsFetchedSelector(domain);
  const payloadSelector = getPayloadSelector<P>(domain);
  const errorSelector = getErrorSelector(domain);

  return {
    isFetching: isFetchingSelector,
    useIsFetching: (): boolean => useSelector(isFetchingSelector),
    isFetched: isFetchedSelector,
    useIsFetched: (): boolean => useSelector(isFetchedSelector),
    payload: payloadSelector,
    usePayload: (): P => useSelector(payloadSelector),
    error: errorSelector,
    useError: (): string => useSelector(errorSelector),
  };
};
