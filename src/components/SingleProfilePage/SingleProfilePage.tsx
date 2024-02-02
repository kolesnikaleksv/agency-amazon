import { useParams } from 'react-router-dom';
import useDataService from '../services/DataService';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampaignData } from '../../actions/actions';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfilesById } from '../Profiles/profilesSlice';
import CampaignList from '../CampaignList/CampaignList';

import './single-profile-page.scss'

const SingleProfilePage = () => {
  const profile = useSelector((state: RootState) => state.profilesReducer.profile);
  const campaignsData = useSelector((state: RootState) => state.campaignReducer.campaigns);
  const { id } = useParams();
  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>();

  const relatedCampaigns = campaignsData.filter(item => item.belongProfileId === id);


  useEffect(() => {
    dispatch(fetchCampaignData(fetchData));
    if(id) dispatch(fetchProfilesById(id))
  }, []);
  
  return (
    <div className='profile-page'>
      
      {profile ? (
        <div className='profile-card'>
          <h1>Page of profile: {profile.id}</h1>
          <div className='profile-card__item'>
            <img src={profile.photo} alt={profile.country} />
            <div className='profile-card__text'>
              <div><strong>country: </strong>{profile.country}</div>
              <div><strong>marketPlace: </strong>{profile.marketPlace}</div>
              <div><strong>date: </strong>{profile.date}</div>
              <div><strong>belong Account: </strong>{profile.belongAccountId}</div>
            </div>
          </div>
          <div className='campaigns-list'>
            List of campaigns
            <div className='line'></div>
            {
              relatedCampaigns.length
              ? <CampaignList campaigns={relatedCampaigns} />
              : <div>There are no related company</div>
            }
          </div>
        </div>
      ) : (
        <p>profile not found</p>
      )}
    </div>
  )
}

export default SingleProfilePage;