import  { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { fetchAccounts, closeActiveAccount } from '../../actions/actions';
import CureentAccount from '../CurrentAccount/CurrentAccount';
import AccountsList from '../AccountsLIst/AccountsList';
import useDataService from '../sevices/DataService';
import Popup from '../Popup/Popup';
import { AppDispatch, RootState } from '../../store/store';

import './accounts.scss';

const Accounts = () => {
  const accountsList = useSelector((state: RootState) => state.accountsReducer.accounts);
  const activeAccountItem = useSelector((state: RootState) => state.accountsReducer.activeAccount);
  const popupActive = useSelector((state: RootState) => state.accountsReducer.popupActive);

  const {fetchData} = useDataService();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAccounts(fetchData));
    
    // eslint-disable-next-line
  }, [])

  return (
    <div className='accounts' data-testid="main-page">
      <div className='accounts__header'>
        <h1>Accounts / {accountsList.length}</h1>
			</div>
      <div className='accounts__body'>
        <AccountsList data={accountsList}/>
        {
          activeAccountItem ?
            <div className='accounts__body--profiles'>
              <CureentAccount account={activeAccountItem} onClose={() => dispatch(closeActiveAccount())} />
            </div>
            : null
        }
			</div>
      {
        popupActive ?
        <Popup />
        : null
      } 
    </div>
  );
};

export default Accounts;