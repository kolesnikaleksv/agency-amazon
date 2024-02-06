import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { 
  accountsFetching, 
  accountsFetched, 
  accountsFetchingError, 
  activeAccount,
  closeActiveAccount,
  popupActive, 
  closePopup} from "../actions/actions";
import { IAccount } from "../types";

interface IState {
  accounts: IAccount[],
  accountsLoadingStatus: 'idle'  | 'loading' | 'error',
  activeAccount: string,
  popupActive: boolean,
  popupItem: IAccount | null
}

const initialState: IState = {
  accounts: [],
  accountsLoadingStatus: 'idle',
  activeAccount: '',
  popupActive: false,
  popupItem: null
}

const accountsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(accountsFetching, state => {
      state.accountsLoadingStatus = 'loading';
    })
    .addCase(accountsFetched, (state, action: PayloadAction<IAccount[]>) => {
      state.accounts = action.payload;
      state.accountsLoadingStatus = 'idle';
    })
    .addCase(accountsFetchingError, state => {
      state.accountsLoadingStatus = 'error';
    })
    .addCase(activeAccount, (state, action: PayloadAction<string>) => {
      state.activeAccount = action.payload;
    })
    .addCase(closeActiveAccount, (state) => {
      state.activeAccount = '';
    })
    .addCase(popupActive, (state, action: PayloadAction<IAccount> )=> {
      state.popupActive = true;
      state.popupItem = action.payload;
    })
    .addCase(closePopup, (state )=> {
      state.popupActive = false;
    })
    .addDefaultCase((state, action) => {})
})

export default accountsReducer;