import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';

export const fetchAccounts = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(accountsFetching());
  fetchData('http://localhost:5000/accounts')
  .then(data => dispatch(accountsFetched(data)))
  .catch(() => dispatch(accountsFetchingError()));
}

export const accountsFetching = createAction('ACCOUNTS_FETCHING');
export const accountsFetched = createAction<any>('ACCOUNTS_FETCHED');
export const accountsFetchingError = createAction('ACCOUNTS_FETCHING_ERROR');
export const activeAccount = createAction<any>('ACTIVE_ACCOUNT');
export const closeActiveAccount = createAction('CLOSE_ACTIVE_ACCOUNT');