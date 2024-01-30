import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import getDate from "../services/getDate";
import Spinner from "../spinner/Spinner";
import { createSelector } from "@reduxjs/toolkit";

import './profile-item.scss';

const ProfileList = () => {
  const profilesLoadingStatus = useSelector((state: RootState) => state.profilesReducer.loadingStatus); 
  const filteredProfilesSelector = createSelector(
    (state: RootState) => state.profilesReducer.activeFilter,
    (state: RootState) => state.profilesReducer.profiles,
    (state: RootState) => state.profilesReducer.searchFilter,
    (activeFilter, profiles, searchFilter) => {
      if(activeFilter === 'all' && searchFilter === '') {
          return profiles;
        } 
        else if(activeFilter !== 'all' && searchFilter === ''){
          return profiles.filter(item => item.country === activeFilter);
        } 
        else if (searchFilter !== '' && activeFilter === 'all'){
          return profiles.filter((item) =>
          item.country.toLowerCase().includes(searchFilter.toLowerCase())
        );
        } 
        else if(activeFilter !== 'all' || searchFilter !== ''){
          return profiles.filter((item) => item.country === activeFilter && item.country.toLowerCase().includes(searchFilter.toLowerCase()))
        } 
        else {
          throw new Error('Something went wrong!')
        }
    }
  )

  const filteredProfiles = useSelector(filteredProfilesSelector);

  if(profilesLoadingStatus === 'error') {
    return (
      <div>Something went wrong</div> 
    )
  } else if(profilesLoadingStatus === 'loading') {
    return (
      <Spinner/>
    )
  }

  if(!filteredProfiles.length) {
    return(
      <div>There are no profiles of the selected type</div> 
    )
  }
  
  const item = filteredProfiles.map(item => {
    const {id, belongAccountId, country, date, marketPlace, photo } = item;
    return (
      <li key={id}>
        <div className='profile-item'>
          <div className="profile-item__cirle green"></div>
          <div className='profile-item__image'>
            <img src={photo} alt='user' />
          </div>
          <div className='profile-item__title'>
            {date}
            <span>{marketPlace}</span>
          </div>
          <div className='profile-item__status-date'>
            <span>from  {date}</span>
            <span>to {date}</span>
          </div>
          <div className='profile-item__group-name'>
            {country}
          </div>
          <div className='profile-item__owner'>
            {belongAccountId}
          </div>
          <div className='profile-item__date'>
            <span className='profile-item__date profile-item__date--short'>{getDate(date, 'shortDate')}</span>
            <span className='profile-item__date profile-item__date--full'>{getDate(date, 'fullDate')}</span>
          </div>
          <div className='profile-item__delete'>
            <span className="material-symbols-outlined">
              delete
            </span>
          </div>
        </div>
      </li>
    )
  })

  return (
    <ul className='profile__list'>
      {item}
    </ul>
  )
}

export default ProfileList;