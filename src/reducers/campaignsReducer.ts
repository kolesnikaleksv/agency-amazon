import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { 
  activeCampaignFilter, 
  campaignFetched, 
  campaignFetching, 
  campaignFetchingError, 
  searchCampaignFilter } from "../actions/actions";
import { ICampaign } from "../types";

type ICampaigns = {
  campaigns: ICampaign[];
  campaignLoadingStatus: 'idle' | 'error' | 'loading';
  activeCampaignFilter: string;
  searchCampaignFilter: string;
}
const initialState: ICampaigns = {
  campaigns: [],
  campaignLoadingStatus: 'idle',
  activeCampaignFilter: 'All prices',
  searchCampaignFilter: ''
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
    .addCase(activeCampaignFilter, (state, action: PayloadAction<string>) => {
      state.activeCampaignFilter = action.payload;
    })
    .addCase(searchCampaignFilter, (state, action: PayloadAction<string>) => {
      state.searchCampaignFilter = action.payload;
    })
})

export default campaignReducer;