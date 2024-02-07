import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles, filterChanged, searchFilter } from './profilesSlice';
import ProfileList from '../ProfileLIst/ProfileList';
import AppPaginate from '../AppPaginate';
import { createSelector } from '@reduxjs/toolkit';
import { IProfile } from '../../types';
import SortingBlock from '../SortingBlock/SortingBlock';

import './profiles.scss';

const Profiles = () => {
  const currentProfiles = useSelector((state: RootState) => state.profilesReducer.profiles);
  const activeFilter = useSelector((state: RootState) => state.profilesReducer.activeFilter);
  const [limitedProfiles, setProducts] = useState<IProfile[]>([]);
  const filteredProfilesSelector = createSelector(
    (state: RootState) => state.profilesReducer.activeFilter,
    (state: RootState) => state.profilesReducer.profiles,
    (state: RootState) => state.profilesReducer.searchFilter,
    (activeFilter, profiles, searchFilter) => {
      if(activeFilter === 'All countries' && searchFilter === '') {
          return profiles;
        } 
        else if(activeFilter !== 'All countries' && searchFilter === ''){
          return profiles.filter(item => item.country === activeFilter);
        } 
        else if (activeFilter === 'All countries' && searchFilter !== ''){
          return profiles.filter((item) =>
          item.country.toLowerCase().includes(searchFilter.toLowerCase())
        );
        } 
        else if(activeFilter !== 'All countries' || searchFilter !== ''){
          return profiles.filter((item) => item.country === activeFilter && item.country.toLowerCase().includes(searchFilter.toLowerCase()))
        } 
        else {
          throw new Error('Something went wrong!')
        }
    }
  )

  const filteredProfiles = useSelector(filteredProfilesSelector);
 
  const useAppDispatch = () => useDispatch<AppDispatch>()
  const dispatch: AppDispatch = useAppDispatch();
  
  const typeSet = new Set<string>(['All countries']);
  currentProfiles.forEach(item => {
    typeSet.add(item.country)
  });

  const sortOption = Array.from(typeSet);

  useEffect(() => {
    dispatch(fetchProfiles())
    // eslint-disable-next-line
  },[activeFilter])

  return (
    <div className='profile' data-testid="profile-page">
      <div className='profile__header'>
        <h1>Profiles / {currentProfiles.length}</h1>
      <SortingBlock 
        sortOption={sortOption} 
        items={filteredProfiles} 
        filterChange={(p) => dispatch(filterChanged(p))}
        searchFilter={(p) => dispatch(searchFilter(p))}/>
			</div>
      <div className='profile__body'>
        <ProfileList limitedProfiles={filteredProfiles.length > 5 ? limitedProfiles : filteredProfiles} />
        {
          filteredProfiles.length > 5
          ? <AppPaginate filteredProfiles={filteredProfiles} setProducts={(p) => setProducts(p as IProfile[])}/>
          : null
        }
			</div>
    </div>
  )
}

export default Profiles;