import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useDataService from "../services/DataService";
import { Iprofile, DataType, ICampaign } from "../../types";

interface IState {
  profiles: Iprofile[];
  profile: null | Iprofile;
  loadingStatus: 'idle' | 'error' | 'loading';
  activeFilter: string;
  searchFilter: string;
}

const initialState: IState = {
  profiles: [],
  profile: null,
  loadingStatus: 'idle',
  activeFilter: 'All countries',
  searchFilter: ''
}
const isIprofile = (arr: DataType | ICampaign | Iprofile[]): arr is Iprofile[] => {
  return Array.isArray(arr)
}

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchPros",
 async () => {
  const {fetchData} = useDataService();
  const data = await fetchData('http://localhost:5000/profiles');
  
  if(isIprofile(data)) {
    return data.sort((a, b) => a.country.localeCompare(b.country))
  } else {
    throw new Error('something went wrong')
  }
 }
);

export const fetchProfilesById = createAsyncThunk(
  "profile/fetchPro",
 async (id: string) => {
  const {fetchDataId} = useDataService();
  const data = await fetchDataId('http://localhost:5000/profiles', id);
  return data;
 }
);

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    filterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
    searchFilter: (state, action) => {
      state.searchFilter = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addCase(fetchProfilesById.pending, (state) => {
        state.loadingStatus = 'loading';
      })
      .addCase(fetchProfilesById.fulfilled, (state, action) => {
        state.loadingStatus = 'idle';
        state.profile = action.payload;
      })
      .addCase(fetchProfilesById.rejected, (state) => {
        state.loadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  },
})
export const {
  filterChanged,
  searchFilter
} = profilesSlice.actions;
export default profilesSlice.reducer;