import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { get } from 'utils/tools';
import { State } from 'models/store';

const getIsFetchedSelector = (domain: string) => (state: State): boolean => {
  return get(state, domain, {}).isFetched;
};

const getIsFetchingSelector = (domain: string) => (state: State): boolean => {
  const isFetching = get(state, domain, {}).isFetching;
  const isFetched = getIsFetchedSelector(domain)(state);

  return isFetching || !isFetched;
};

const getPayloadSelector = <P>(domain: string) => (state: State): P => {
  return get(state, domain, {}).payload;
};

const getErrorSelector = (domain: string) => (
  state: State,
): SerializedError => {
  return get(state, domain, {}).error;
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
    useError: (): SerializedError => useSelector(errorSelector),
  };
};
