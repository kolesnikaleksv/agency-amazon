import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles, filterChanged, searchFilter } from './profilesSlice';
import ProfileList from '../ProfileLIst/ProfileList';
import AppPaginate from '../AppPaginate';
import { createSelector } from '@reduxjs/toolkit';
import { Iprofile } from '../../types';

import './profiles.scss';

const Profiles = () => {
  const currentProfiles = useSelector((state: RootState) => state.profilesReducer.profiles);
  const activeFilter = useSelector((state: RootState) => state.profilesReducer.activeFilter);
  const [limitedProfiles, setProducts] = useState<Iprofile[]>([]);
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

  const optionsList = Array.from(typeSet).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));

  useEffect(() => {
    dispatch(fetchProfiles())
    // eslint-disable-next-line
  },[activeFilter])

  return (
    <div className='profile' data-testid="profile-page">
      <div className='profile__header'>
        <h1>Profiles / {currentProfiles.length}</h1>
        <form action="#">
          <label htmlFor="type">Type of products:</label>
          <select name="types" id="type" onChange={(e) => dispatch(filterChanged(e.target.value))}>
            {optionsList}
          </select>
        </form>
        <div className='profile__filter'>
        <label htmlFor="profile-filter">Filter profiles:</label>
            <input
                className='profile__filter--input'
                type='search'
                id='profile-filter'
                name='profile-filter'
                placeholder='Search'
                aria-label='Search'
                onChange={(e) => dispatch(searchFilter(e.target.value))}
              />
          </div>
			</div>
      <div className='profile__body'>
        <ProfileList limitedProfiles={filteredProfiles.length > 5 ? limitedProfiles : filteredProfiles} />
        {
          filteredProfiles.length > 5
          ? <AppPaginate filteredProfiles={filteredProfiles} setProducts={(p) => setProducts(p)}/>
          : null
        }
			</div>
    </div>
  )
}

export default Profiles;