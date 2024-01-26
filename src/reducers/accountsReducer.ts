import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { 
  accountsFetching, 
  accountsFetched, 
  accountsFetchingError, 
  activeAccount,
  closeActiveAccount,
  popupActive, 
  closePopup} from "../actions/actions";

  interface PopupActivePayload {
    accountId: number;
    title: string;
    creationDate: string;
    email: string;
  }
interface IState {
  accounts: any[],
  accountsLoadingStatus: 'idle'  | 'loading' | 'error',
  activeAccount: null | number,
  popupActive: boolean,
  popupItem: PopupActivePayload | null
}

const initialState: IState = {
  accounts: [],
  accountsLoadingStatus: 'idle',
  activeAccount: null,
  popupActive: false,
  popupItem: null
}

const accountsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(accountsFetching, state => {
      state.accountsLoadingStatus = 'loading';
    })
    .addCase(accountsFetched, (state, action: PayloadAction<any>) => {
      state.accounts = action.payload;
      state.accountsLoadingStatus = 'idle';
    })
    .addCase(accountsFetchingError, state => {
      state.accountsLoadingStatus = 'error';
    })
    .addCase(activeAccount, (state, action: PayloadAction<any>) => {
      state.activeAccount = action.payload;
    })
    .addCase(closeActiveAccount, (state) => {
      state.activeAccount = null;
    })
    .addCase(popupActive, (state, action )=> {
      state.popupActive = true;
      state.popupItem = action.payload;
    })
    .addCase(closePopup, (state )=> {
      state.popupActive = false;
    })
    .addDefaultCase((state, action) => {})
})

export default accountsReducer;