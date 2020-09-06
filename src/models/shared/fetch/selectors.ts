import { SerializedError } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { get } from 'utils/tools';
import { State } from 'models/store';
import { FetchStatus } from './types';

const getIsInitialSelector = (domain: string) => (state: State): boolean => {
  const status = get(state, domain, {}).status as FetchStatus;

  return status === 'INITIAL';
};

const getIsPendingSelector = (domain: string) => (state: State): boolean => {
  const status = get(state, domain, {}).status as FetchStatus;

  return status === 'PENDING';
};

const getIsSuccessSelector = (domain: string) => (state: State): boolean => {
  const status = get(state, domain, {}).status as FetchStatus;

  return status === 'SUCCESS';
};

const getIsFailureSelector = (domain: string) => (state: State): boolean => {
  const status = get(state, domain, {}).status as FetchStatus;

  return status === 'FAILURE';
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
  const isInitialSelector = getIsInitialSelector(domain);
  const isPendingSelector = getIsPendingSelector(domain);
  const isSuccessSelector = getIsSuccessSelector(domain);
  const isFailureSelector = getIsFailureSelector(domain);
  const payloadSelector = getPayloadSelector<P>(domain);
  const errorSelector = getErrorSelector(domain);

  return {
    isInitial: isInitialSelector,
    useIsInitial: (): boolean => useSelector(isInitialSelector),
    isPending: isPendingSelector,
    useIsFetching: (): boolean => useSelector(isPendingSelector),
    isSuccess: isSuccessSelector,
    useIsSuccess: (): boolean => useSelector(isSuccessSelector),
    isFailure: isFailureSelector,
    useIsFailure: (): boolean => useSelector(isFailureSelector),
    payload: payloadSelector,
    usePayload: (): P => useSelector(payloadSelector),
    error: errorSelector,
    useError: (): SerializedError => useSelector(errorSelector),
  };
};
