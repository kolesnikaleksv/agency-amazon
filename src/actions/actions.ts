import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';
import { PopupActivePayload } from "../types";

export const fetchAccounts = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(accountsFetching());
  fetchData('http://localhost:5000/accounts')
  .then(data => dispatch(accountsFetched(data)))
  .catch(() => dispatch(accountsFetchingError()));
}

export const fetchProfiles = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(profilesFetching());
  fetchData('http://localhost:5000/profiles')
  .then(data => dispatch(profilesFetched(data)))
  .catch(() => dispatch(profilesFetchingError()));
}

export const fetchCampaignData = (fetchData: (url: string) => Promise<any>) => (dispatch: Dispatch) => {
  dispatch(campaignFetching());
  fetchData(`http://localhost:5000/campaigns`)
    .then(data => dispatch(campaignFetched(data)))
    .catch(() => dispatch(campaignFetchingError()));
}
// interface PopupActivePayload {
//   accountId: number;
//   title: string;
//   creationDate: string;
//   email: string;
// }
export const accountsFetching = createAction('ACCOUNTS_FETCHING');
export const accountsFetched = createAction<any>('ACCOUNTS_FETCHED');
export const accountsFetchingError = createAction('ACCOUNTS_FETCHING_ERROR');
export const activeAccount = createAction<any>('ACTIVE_ACCOUNT');
export const closeActiveAccount = createAction('CLOSE_ACTIVE_ACCOUNT');
export const popupActive = createAction<PopupActivePayload>('POPUP_ACTIVE');
export const closePopup = createAction('CLOSE_POPUP');

export const profilesFetching = createAction('PROFILES_FETCHING');
export const profilesFetched = createAction<any>('PROFILES_FETCHED');
export const profilesFetchingError = createAction('PROFILES_FETCHING_ERROR');
export const activeFilterChanged = createAction ('ACTIVE_FILTER_CHANGED');

export const campaignFetching = createAction('PROFILE_FETCHING');
export const campaignFetched = createAction<any>('PROFILE_FETCHED');
export const campaignFetchingError = createAction('PROFILE_FETCHING_ERROR');