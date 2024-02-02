import { useDispatch, useSelector } from 'react-redux';
import CampaignList from '../CampaignList/CampaignList';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { fetchCampaignData } from '../../actions/actions';
import useDataService from '../services/DataService';

import './campaigns.scss'

const Campaigns = () => {
  const campaigns = useSelector((state: RootState) => state.campaignReducer.campaigns);
  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCampaignData(fetchData))
  },[])
  return (
    <div className='campaigns-page'>
      <div className="campaigns-page__header">
        <h1>Accounts / {campaigns.length}</h1>
      </div>
      <div className="campaigns-page__body">
        {
          campaigns.length
          ? <CampaignList campaigns={campaigns} />
          : <div>There are no campaigns</div>
        }
      </div>
    </div>
  )
}

export default Campaigns;