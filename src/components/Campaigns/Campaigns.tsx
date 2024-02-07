import { useDispatch, useSelector } from 'react-redux';
import CampaignList from '../CampaignList/CampaignList';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { activeCampaignFilter, fetchCampaignData, searchCampaignFilter } from '../../actions/actions';
import useDataService from '../services/DataService';
import AppPaginate from '../AppPaginate';
import SortingBlock from '../SortingBlock/SortingBlock';
import { createSelector } from '@reduxjs/toolkit';

import './campaigns.scss'

const Campaigns = () => {
  const campaigns = useSelector((state: RootState) => state.campaignReducer.campaigns);
  const [products, setProducts] = useState([]);
  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>();
  const filteredCampaignsSelector = createSelector(
    (state: RootState) => state.campaignReducer.activeCampaignFilter,
    (state: RootState) => state.campaignReducer.campaigns,
    (state: RootState) => state.campaignReducer.searchCampaignFilter,
    (activeFilter, profiles, searchFilter) => {
      if(activeFilter === 'All prices' && searchFilter === '') {
          return profiles;
        } 
        else if(activeFilter !== 'All prices' && searchFilter === ''){
          return profiles.filter(item => item.cost.toString() === activeFilter);
        } 
        else if (activeFilter === 'All prices' && searchFilter !== ''){
          return profiles.filter((item) =>
          item.cost.toString().toLowerCase().includes(searchFilter.toLowerCase())
        );
        } 
        else if(activeFilter !== 'All prices' || searchFilter !== ''){
          return profiles.filter((item) => item.cost.toString() === activeFilter && item.cost.toString().toLowerCase().includes(searchFilter.toLowerCase()))
        } 
        else {
          throw new Error('Something went wrong!')
        }
    }
  )

  const filteredCampaigns = useSelector(filteredCampaignsSelector);

  if(!campaigns) {
    return 'hello'
  }

  const typeSet = new Set<string>(['All prices']);
  campaigns.forEach(item => {
    typeSet.add(item.cost.toString())
  });

  const sortOption = Array.from(typeSet);
  useEffect(() => {
    dispatch(fetchCampaignData(fetchData))
  },[])
  return (
    <div className='campaigns-page'>
      <div className="campaigns-page__header">
        <h1>Accounts / {campaigns.length}</h1>
        <SortingBlock 
          sortOption={sortOption} 
          items={filteredCampaigns} 
          filterChange={(p) => dispatch(activeCampaignFilter(p))}
          searchFilter={(p) => dispatch(searchCampaignFilter(p))}
          />
      </div>
      <div className="campaigns-page__body">
        {
          filteredCampaigns.length
          ? <CampaignList campaigns={filteredCampaigns.length > 5 ? products : filteredCampaigns } />
          : <div>There are no campaigns</div>
        }
        {
          filteredCampaigns.length > 5
          ? <AppPaginate filteredProfiles={filteredCampaigns} setProducts={(p) => setProducts(p as never)}/>
          : null
        }
      </div>
    </div>
  )
}

export default Campaigns;