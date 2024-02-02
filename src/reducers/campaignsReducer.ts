import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { campaignFetched, campaignFetching, campaignFetchingError } from "../actions/actions";
import { ICampaign } from "../types";

type ICampaigns = {
  campaigns: ICampaign[];
  campaignLoadingStatus: 'idle' | 'error' | 'loading'
}
const initialState: ICampaigns = {
  campaigns: [],
  campaignLoadingStatus: 'idle'
}

const campaignReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(campaignFetching, state => {
      state.campaignLoadingStatus = 'loading';
    })
    .addCase(campaignFetched, (state, action: PayloadAction<ICampaign[]>) => {
      state.campaignLoadingStatus = 'idle';
      state.campaigns = action.payload;
    })
    .addCase(campaignFetchingError, state => {
      state.campaignLoadingStatus = 'error';
    })
})

export default campaignReducer;