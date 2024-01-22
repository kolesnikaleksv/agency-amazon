import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { 
  accountsFetching, 
  accountsFetched, 
  accountsFetchingError, 
  activeAccount,
  closeActiveAccount } from "../actions/actions";

interface IState {
  accounts: any[],
  accountsLoadingStatus: 'idle'  | 'loading' | 'error',
  activeAccount: null | number,
  popupActive: boolean,
}

const initialState: IState = {
  accounts: [],
  accountsLoadingStatus: 'idle',
  activeAccount: null,
  popupActive: false
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
    .addDefaultCase((state, action) => {})
})

export default accountsReducer;



// import { createReducer, PayloadAction } from "@reduxjs/toolkit";
// import { 
//   ordersFetching, 
//   ordersFetched, 
//   ordersFetchingError, 
//   activeOrder, 
//   closeActiveOrder, 
//   popupActive, 
//   closePopup, 
//   orderDeleted } from "../actions/actions";

// interface OrderState {
//   orders: any[],
//   ordersLoadingStatus: 'idle'  | 'loading' | 'error',
//   products: string [],
//   activeOrder: null | number,
//   popupActive: boolean,
//   orderToDelete: number
// }

// const initialState: OrderState = {
//   orders: [],
//   ordersLoadingStatus: 'idle',
//   products: [],
//   activeOrder: null,
//   popupActive: false,
//   orderToDelete: 0
// }

// const ordersReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(ordersFetching, state => {
//       state.ordersLoadingStatus = 'loading';
//     })
//     .addCase(ordersFetched, (state, action: PayloadAction<any>) => {
//       state.orders = action.payload;
//       state.ordersLoadingStatus = 'idle';
//     })
//     .addCase(ordersFetchingError, state => {
//       state.ordersLoadingStatus = 'error';
//     })
//     .addCase(activeOrder, (state, action: PayloadAction<any>) => {
//       state.activeOrder = action.payload;
//     })
//     .addCase(closeActiveOrder, (state, action) => {
//       state.activeOrder = null;
//     })
//     .addCase(popupActive, (state, action: PayloadAction<any> )=> {
//       state.popupActive = true;
//       state.orderToDelete = action.payload;
//     })
//     .addCase(closePopup, (state, action: PayloadAction<any>) => {
//       state.popupActive = false;
//       state.orderToDelete = action.payload;
//     })
//     .addCase(orderDeleted, (state, action) => {
//       state.orders = state.orders.filter(item => item.id !== action.payload);
//     })
//     .addDefaultCase((state, action) => {})
// })

// export default ordersReducer;

