import { createAction } from "@reduxjs/toolkit";
import { Dispatch } from 'redux';
import { IAccount } from "../types";

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
export const accountsFetched = createAction<IAccount[]>('ACCOUNTS_FETCHED');
export const accountsFetchingError = createAction('ACCOUNTS_FETCHING_ERROR');
export const activeAccount = createAction<string>('ACTIVE_ACCOUNT');
export const closeActiveAccount = createAction('CLOSE_ACTIVE_ACCOUNT');
export const popupActive = createAction<IAccount>('POPUP_ACTIVE');
export const closePopup = createAction('CLOSE_POPUP');

export const activeAccountFilter = createAction<string>('ACTIVE_ACCOUNT_FILTER');
export const searchAccountFilter = createAction<string>('SEARCH_ACCOUNT_FILTER');

export const activeCampaignFilter = createAction<string>('ACTIVE_CAMPAIGN_FILTER');
export const searchCampaignFilter = createAction<string>('SEARCH_CAMPAIGN_FILTER');

export const campaignFetching = createAction('PROFILE_FETCHING');
export const campaignFetched = createAction<any>('PROFILE_FETCHED');
export const campaignFetchingError = createAction('PROFILE_FETCHING_ERROR');