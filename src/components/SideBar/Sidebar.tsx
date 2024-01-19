import user from '../../assets/user.jpg';
import settings from '../../assets/cog.png';
import { NavLink } from 'react-router-dom';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__image'>
        <img src={user} alt='user'/>
        <div className='sidebar__image--settings'>
          <img src={settings} alt='settings' />
        </div>
      </div>
        <ul className='sidebar__nav'>
          <li className='sidebar__nav--item'>
            <NavLink to='/' data-testid="main-link">accounts</NavLink>
          </li>
          <li className='sidebar__nav--item'>
            <NavLink to='profiles' data-testid='groups-link'>Profiles</NavLink>
          </li>
          <li className='sidebar__nav--item'>
            <NavLink to='campaings' data-testid="product-link">Campaings</NavLink>
          </li>
        </ul>
    </div>
  );
};

export default Sidebar;