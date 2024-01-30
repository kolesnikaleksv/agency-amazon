import { createReducer } from "@reduxjs/toolkit";
// import { productsFetching, productsFetched, activeFilterChanged, productsFetchingError } from "../actions/actions";
import { profilesFetched, profilesFetching, profilesFetchingError, activeFilterChanged } from "../actions/actions";

interface Iproducts {
  id: number;
  country: string;
  marketPlace: string;
  photo: string;
  belongAccountId: number;
  date: string; 
}

interface IProductState {
  profiles: Iproducts[];
  profilesLoadingStatus: 'idle' | 'loading' | 'error';
  activeFilter: 'all' | string | undefined;
  profile: Iproducts | null;
  profileLoadingStatus: 'idle' | 'loading' | 'error',
}

const initialState: IProductState = {
  profiles: [],
  profilesLoadingStatus: 'idle',
  activeFilter: 'all',
  profile: null,
  profileLoadingStatus: 'idle',
}

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(profilesFetching, (state) => {
      state.profilesLoadingStatus = 'loading';
    })
    .addCase(profilesFetched, (state, action) => {
      state.profiles = action.payload;
      state.profilesLoadingStatus = 'idle';
    })
    .addCase(activeFilterChanged, (state, action) => {
      state.activeFilter = action.payload;
    })
    .addCase(profilesFetchingError, (state) => {
      state.profilesLoadingStatus = 'error';
    })
})

export default productsReducer;