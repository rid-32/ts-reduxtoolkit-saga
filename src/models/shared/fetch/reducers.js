import { INITIAL_FETCH_STATE, FETCH_STATUSES } from './consts';

export const getFetchReducers = () => ({
  resetFetch: state => {
    state.status = INITIAL_FETCH_STATE.status;
    state.payload = INITIAL_FETCH_STATE.payload;
    state.error = INITIAL_FETCH_STATE.error;
  },
  fetchSaga: (state, action) => {
    /* creating an action for corresponding saga  */
  },
});

export const getFetchExtraReducers = fetchThunk => builder => {
  builder.addCase(fetchThunk.pending, state => {
    state.status = FETCH_STATUSES.PENDING;
  });
  builder.addCase(fetchThunk.fulfilled, (state, action) => {
    state.status = FETCH_STATUSES.SUCCESS;
    state.payload = action.payload;
    state.error = null;
  });
  builder.addCase(fetchThunk.rejected, (state, action) => {
    state.status = FETCH_STATUSES.FAILURE;
    state.error = action.error;
  });
};
