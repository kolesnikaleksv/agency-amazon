import { useSelector } from 'react-redux';
import getDate from '../sevices/getDate';
import { RootState } from '../../store/store';
import { AccountItemProps } from '../../types';

import './accountItem.scss';

const AccountItem: React.FC<AccountItemProps> = (props) => {
  const activeItemId = useSelector((state: RootState) => state.accountsReducer.activeAccount);

  const { title, creationDate, email, authToken, onOpen, accountId} = props;
  
  return (
    <div className={`item ${activeItemId ? 'half-screen': ''} ${activeItemId === accountId ? 'active' : ''}`}>
      <div className='item__title'>
        {title}
      </div>
      <div className='item__menu' onClick={() => onOpen()}>
        <span className="material-symbols-outlined">
          list
        </span>
      </div>
      <div className='item__token'>
        <span className='item__token item__token'>{authToken}</span>
        <span className='item__token item__token--description'>authTocken</span>
      </div>
      <div className='item__date'>
        <span className='item__date item__date--short'>{creationDate ? getDate(creationDate, 'shortDate') : 'without date'}</span>
        <span className='item__date item__date--full'>{creationDate ? getDate(creationDate, 'fullDate') : 'no date'}</span>
      </div>
      <div className='item__email'>
        <span className='item__email item__email'>{email}</span>
        <span className='item__email item__email--description'>email</span>
      </div>
      <div className='item__delete'>
        <span className="material-symbols-outlined">
          delete
        </span>
      </div> 
      <div className='item__arrow'>
        <span className="material-symbols-outlined">
          arrow_forward_ios
        </span>
      </div>
    </div>
  )
}

export default AccountItem;