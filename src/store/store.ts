import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from '../reducers/accountsReducer';
import profilesReducer from '../components/Profiles/profilesSlice';
import campaignReducer from '../reducers/campaignsReducer';

const store = configureStore({
  reducer: {accountsReducer, profilesReducer, campaignReducer},


  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export default store;