import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProfiles, filterChanged, searchFilter } from './profilesSlice';
import ProductList from '../ProfileLIst/ProfileList';

import './profiles.scss';

const Profiles = () => {
  const currentProfiles = useSelector((state: RootState) => state.profilesReducer.profiles);
  const activeFilter = useSelector((state: RootState) => state.profilesReducer.activeFilter);

  const useAppDispatch = () => useDispatch<AppDispatch>()
  const dispatch: AppDispatch = useAppDispatch();
  
  const typeSet = new Set<string>();
  currentProfiles.forEach(item => { 
    typeSet.add(item.country)
  });

  const optionsList = Array.from(typeSet).map(item => (
    <option key={item} value={item}>
      {item}
    </option>
  ));
  
  useEffect(() => {
    dispatch(fetchProfiles())
    // eslint-disable-next-line
  },[])

  return (
    <div className='profile' data-testid="profile-page">
      <div className='profile__header'>
        <h1>Profiles / {currentProfiles.length}</h1>
        <form action="#">
          <label htmlFor="type">Type of products:</label>
          <select name="types" id="type" onChange={(e) => dispatch(filterChanged(e.target.value))}>
            {
              activeFilter === 'all'
              ? <option value="all">Select country</option>
              : <><option value="all">{ activeFilter}</option><option value="all">Select country</option></>
            }
            {optionsList}
          </select>
        </form>
        <div className='profile__filter'>
        <label htmlFor="profile-filter">Filter profiles:</label>
            <input
                className='profile__filter--input'
                type='search'
                id='profile-filter'
                name='profile-filter'
                placeholder='Search'
                aria-label='Search'
                onChange={(e) => dispatch(searchFilter(e.target.value))}
              />
          </div>
			</div>
      <div className='profile__body'>
        <ProductList />
			</div>
    </div>
  )
}

export default Profiles;