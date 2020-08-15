import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Action,
  PayloadAction,
  AsyncThunk,
  // ThunkAction
} from '@reduxjs/toolkit';

function useBindedAction(action: () => Action): () => Action;
function useBindedAction<A extends unknown[], R>(
  action: (...args: A) => PayloadAction<R>,
): (...args: A) => PayloadAction<R>;
function useBindedAction<A, R>(
  action: AsyncThunk<R, A, {}>,
): (arg: A) => ReturnType<typeof action>;
function useBindedAction(action: any): any {
  const dispatch = useDispatch();

  return useCallback(
    (...args: any) => {
      return dispatch(action(...args));
    },
    [dispatch],
  );
}

export { useBindedAction };
