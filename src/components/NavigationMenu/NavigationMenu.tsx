import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Accounts from '../Accounts/Accounts';
import SingleCampaignPage from '../SingleCampaignPage/SingleCampaignPage';
import Profiles from '../Profiles/profiles';
import Campaigns from '../Campaigns/Campaigns';
import SingleProfilePage from '../SingleProfilePage/SingleProfilePage';

const NavigationMenu = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);

  const [transitionStage, setTransistionStage] = useState("fadeIn");
  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div
      className={`${transitionStage} app__pages`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}
      >
      <Routes location={displayLocation}>
        <Route path="/" element={<Accounts/>} />
        <Route path='campaigns/:id' element={<SingleCampaignPage />} />
        <Route path='profiles' element={<Profiles />} />
        <Route path='profiles/:id' element={<SingleProfilePage />} />
        <Route path='campaigns' element={<Campaigns/>} />
        <Route path='campaigns/:id' element={<SingleCampaignPage/>} />
      </Routes>
    </div>
  )
}

export default NavigationMenu;