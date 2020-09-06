// import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { useDispatch } from 'react-redux';
//
// import { FetchSliceActions } from 'models/shared/fetch/types';
// import { TableControlSliceActions } from 'models/shared/tableControl/types';
// import { getChangePageAndFetchDomain } from './consts';
// import { ChangePageAndFetchArg } from './types';
//
// export const getChangePageAndFetch = <P, A>(
//   domain: string,
//   fetchActions: FetchSliceActions<P, A>,
//   tableActions: TableControlSliceActions,
// ) =>
//   createAsyncThunk<PayloadAction<P>, ChangePageAndFetchArg<A>>(
//     getChangePageAndFetchDomain(domain),
//     async ({ page, arg }, { dispatch }) => {
//       dispatch(tableActions.changePage(page));
//
//       return (await dispatch(fetchActions.fetchThunk(arg))) as PayloadAction<P>;
//     },
//   );
//
// export const getDataTableActions = <P, A>(
//   domain: string,
//   fetchActions: FetchSliceActions<P, A>,
//   tableActions: TableControlSliceActions,
// ) => {
//   const changePageAndFetch = getChangePageAndFetch<P, A>(
//     domain,
//     fetchActions,
//     tableActions,
//   );
//
//   return {
//     changePageAndFetch,
//     useChangePageAndFetch: () => {
//       const dispatch = useDispatch();
//
//       return (arg: ChangePageAndFetchArg<A>) =>
//         dispatch(changePageAndFetch(arg));
//     },
//     ...fetchActions,
//     ...tableActions,
//   };
// };
