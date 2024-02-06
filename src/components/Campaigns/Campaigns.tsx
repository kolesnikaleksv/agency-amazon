import { useDispatch, useSelector } from 'react-redux';
import CampaignList from '../CampaignList/CampaignList';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { fetchCampaignData } from '../../actions/actions';
import useDataService from '../services/DataService';
import AppPaginate from '../AppPaginate';

import './campaigns.scss'

const Campaigns = () => {
  const campaigns = useSelector((state: RootState) => state.campaignReducer.campaigns);
  const [products, setProducts] = useState([]);console.log(products);
  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>()

  if(!campaigns) {
    return 'hello'
  }
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
          ? <CampaignList campaigns={products} />
          : <div>There are no campaigns</div>
        }
        {
          campaigns.length > 5
          ? <AppPaginate filteredProfiles={campaigns} setProducts={(p) => setProducts(p as never)}/>
          : null
        }
      </div>
    </div>
  )
}

export default Campaigns;