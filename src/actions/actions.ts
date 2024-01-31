import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';
import { PopupActivePayload } from "../types";

export const fetchAccounts = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(accountsFetching());
  fetchData('http://localhost:5000/accounts')
  .then(data => dispatch(accountsFetched(data)))
  .catch(() => dispatch(accountsFetchingError()));
}

export const fetchCampaignData = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(campaignFetching());
  fetchData(`http://localhost:5000/campaigns`)
    .then(data => dispatch(campaignFetched(data)))
    .catch(() => dispatch(campaignFetchingError()));
}

export const accountsFetching = createAction('ACCOUNTS_FETCHING');
export const accountsFetched = createAction<any>('ACCOUNTS_FETCHED');
export const accountsFetchingError = createAction('ACCOUNTS_FETCHING_ERROR');
export const activeAccount = createAction<any>('ACTIVE_ACCOUNT');
export const closeActiveAccount = createAction('CLOSE_ACTIVE_ACCOUNT');
export const popupActive = createAction<PopupActivePayload>('POPUP_ACTIVE');
export const closePopup = createAction('CLOSE_POPUP');

export const campaignFetching = createAction('PROFILE_FETCHING');
export const campaignFetched = createAction<any>('PROFILE_FETCHED');
export const campaignFetchingError = createAction('PROFILE_FETCHING_ERROR');