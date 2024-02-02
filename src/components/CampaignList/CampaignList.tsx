import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';
import getDate from '../services/getDate';
import React from 'react';
import { ICampaign } from '../../types';

import './campaign-list.scss'

interface CampaignListProps {
  campaigns: ICampaign[]
}

const CampaignList: React.FC<CampaignListProps> = ({campaigns}): JSX.Element => {

  const items = campaigns.map(item => {
    const {belongProfileId, clicks, cost, id, date} = item;
    return (
    <li key={uuidv4()}>
      <NavLink to={`/campaigns/${id}`}>
        <div className='current-account-item'>
          <span>{id}</span>
          <div className='current-account-item__click'>
            <span>clicks</span>
            <span>{clicks}</span>
          </div>
          <div className='current-account-item__title'>
            {belongProfileId}
            <span>{date ? getDate(date, 'fullDate') : 'no date'}</span>
          </div>
          <div className='current-account-item__satus'>
            <span>{cost}</span>
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
  return (
    <ul className='current-account__list'>
      {
        items.length
        ? items
        : <h3>There are no campaigns in this profiles</h3>
      }
    </ul>
  )
}

export default CampaignList;