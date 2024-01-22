import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../reducers/accountsReducer';

const store = configureStore({
  reducer: {accountsReducer},

  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;