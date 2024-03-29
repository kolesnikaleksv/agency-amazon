import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import getDate from '../services/getDate';
import { AppDispatch, RootState } from '../../store/store';
import { NavLink } from 'react-router-dom';
import { fetchProfiles } from '../Profiles/profilesSlice';
import AppPaginate from '../AppPaginate';
import { IProfile } from '../../types';

import './current-account.scss';

interface CurrentAccountProps {
  onClose: () => {};
  account: string;
}

const CureentAccount: React.FC<CurrentAccountProps> = (props) => {
  const currentAccounId = useSelector((state: RootState) => state.accountsReducer.activeAccount);
  const profiles = useSelector((state: RootState) => state.profilesReducer.profiles);
  const relatedProfiles = profiles.filter(item => item.belongAccountId === currentAccounId);
  const [limitedProfiles, setProducts] = useState<IProfile[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProfiles())
  },[])

  return (
    <div className="current-account">
      <div className="current-account__head">
        <h2 className="current-account__head--title">
          Account № {currentAccounId}
        </h2>
        <div className="current-account__head--add-block">
          <span>Add profile</span>
        </div>
      </div>
      <div className="current-account__body">
        <ul className='current-account__list'>
          {
            relatedProfiles.length ?
            limitedProfiles.map(item => {
              const {country, photo, marketPlace, id, date} = item;
              return (
              <li key={uuidv4()}>
                <NavLink to={`profiles/${id}`}>
                  <div className='current-account-item'>
                    <span>{id}</span>
                    <div className='current-account-item__image'>
                      <img src={photo} alt='user' />
                    </div>
                    <div className='current-account-item__title'>
                      {country}
                      <span>{date ? getDate(date, 'fullDate') : 'no date'}</span>
                    </div>
                    <div className='current-account-item__satus'>
                      <span>{marketPlace}</span>
                    </div>
                    <div className='current-account-item__delete'>
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              )
            })
            :<h3>There are no profiles in this account</h3>
          }
        </ul>
        {
          (profiles.length > 1)
          ? <AppPaginate  filteredProfiles={relatedProfiles} setProducts={(p) => setProducts(p as IProfile[])} />
          : null
        }
      </div>
      <CloseButton onClose={props.onClose}/>
    </div>
  )
}

export default CureentAccount;