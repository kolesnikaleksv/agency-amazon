import { useParams } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const SingleCampaignPage = () => {

  const { id } = useParams<{ id: string }>();
  const campaigns = useSelector((state: RootState) => state.campaignReducer.campaigns);
  const campaign = campaigns.find((item) => id ? item.id === +id : null);
 
  return (
    <div>
    <h1 className='text-2xl font-bold'>Campaign Page</h1>
    {campaign ? (
        <div className='mt-5 text-left'>
          <h2 className='text-xl'>Campaign id: {id}</h2>
          <p><strong>date: </strong>{campaign.date}</p>
          <p><strong>Number of clicks: </strong>{campaign.clicks}</p>
          <p><strong>Belonged to profile: </strong>{campaign.belongProfileId}</p>
        </div>
      ) : (
        <p>Campaign not found</p>
      )}
  </div>
  )
}

export default SingleCampaignPage;