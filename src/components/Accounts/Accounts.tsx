import { 
  fetchAccounts, 
  closeActiveAccount, 
  activeAccountFilter, 
  searchAccountFilter } from '../../actions/actions';
import  React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import CureentAccount from '../CurrentAccount/CurrentAccount';
import AccountsList from '../AccountsLIst/AccountsList';
import useDataService from '../services/DataService';
import Popup from '../Popup/Popup';
import { AppDispatch, RootState } from '../../store/store';
import { IAccount } from '../../types';
import AppPaginate from '../AppPaginate';
import SortingBlock from '../SortingBlock/SortingBlock';

import './accounts.scss';

const Accounts: React.FC = () => {
  const accountsList = useSelector((state: RootState) => state.accountsReducer.accounts);
  const activeAccountItem = useSelector((state: RootState) => state.accountsReducer.activeAccount);
  const activeFilter = useSelector((state: RootState) => state.accountsReducer.activeFilter);
  const popupActive = useSelector((state: RootState) => state.accountsReducer.popupActive);
  const filteredAccountsSelector = createSelector(
    (state: RootState) => state.accountsReducer.activeFilter,
    (state: RootState) => state.accountsReducer.accounts,
    (state: RootState) => state.accountsReducer.searchFilter,
    (activeFilter, profiles, searchFilter) => {
      if(activeFilter === 'All auth' && searchFilter === '') {
          return profiles;
        } 
        else if(activeFilter !== 'All auth' && searchFilter === ''){
          return profiles.filter(item => item.authToken === activeFilter);
        } 
        else if (activeFilter === 'All auth' && searchFilter !== ''){
          return profiles.filter((item) =>
          item.authToken.toLowerCase().includes(searchFilter.toLowerCase())
        );
        } 
        else if(activeFilter !== 'All auth' || searchFilter !== ''){
          return profiles.filter((item) => item.authToken === activeFilter && item.authToken.toLowerCase().includes(searchFilter.toLowerCase()))
        } 
        else {
          throw new Error('Something went wrong!')
        }
    }
  )

  const filteredAccounts = useSelector(filteredAccountsSelector);
  
  const [products, setProducts] = useState<IAccount[]>([])
  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAccounts(fetchData));
    // eslint-disable-next-line
  }, [activeFilter])

  const typeSet = new Set<string>(['All auth']);
  accountsList.forEach(item => {
    typeSet.add(item.authToken)
  });

  const sortOption = Array.from(typeSet);
  return (
    <div className='accounts' data-testid="main-page">
      <div className='accounts__header'>
        <h1>Accounts / {accountsList.length}</h1>
        <SortingBlock 
          sortOption={sortOption} 
          items={accountsList} 
          filterChange={(p) => dispatch(activeAccountFilter(p))} 
          searchFilter={(p) => dispatch(searchAccountFilter(p))}
          />
			</div>
      <div className='accounts__body'>
        <AccountsList data={filteredAccounts.length > 5 ? products : filteredAccounts}/>
        {
          activeAccountItem 
          ? <div className='accounts__body--profiles'>
              <CureentAccount account={activeAccountItem} onClose={() => dispatch(closeActiveAccount())} />
            </div>
          : null
        }
			</div>
      {
        filteredAccounts.length > 5
        ? <AppPaginate filteredProfiles={accountsList} setProducts={(p) => setProducts(p as IAccount[])}/>
        : null
      }
      {
        popupActive ?
        <Popup />
        : null
      } 
    </div>
  );
};

export default Accounts;