import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import getDate from "../services/getDate";
import Spinner from "../spinner/Spinner";
import React from "react";
import { IProfile } from "../../types";
import { NavLink } from "react-router-dom";

import './profile-item.scss';
interface ProfileListProps {
  limitedProfiles: IProfile[] ;
}

const ProfileList: React.FC<ProfileListProps> = ({limitedProfiles}) => {
  const profilesLoadingStatus = useSelector((state: RootState) => state.profilesReducer.loadingStatus); 

  if(profilesLoadingStatus === 'error') {
    return (
      <div>Something went wrong</div> 
    )
  } else if(profilesLoadingStatus === 'loading') {
    return (
      <Spinner/>
    )
  }
   if(!limitedProfiles) {
    return "something wetn wrong"
   }
  if(!limitedProfiles.length) {
    return(
      <div>There are no profiles of the selected type</div> 
    )
  }
  
  const item = limitedProfiles.map(item => {
    const {id, belongAccountId, country, date, marketPlace, photo } = item;
    return (
      <li key={id}>
        <div className='profile-item'>
          <div className="profile-item__cirle green"></div>
          <div className='profile-item__image'>
          <NavLink to={`/profiles/${id}`}>
            <img src={photo} alt='user' />
          </NavLink>
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
          <div className='profile-item__owner flex flex-col'>
            <span>Belong account: {belongAccountId}</span>
            <span>Profile id: {id}</span>
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