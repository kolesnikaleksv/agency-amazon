import { useState, useEffect } from 'react';
import logo from '../../assets/amazon_logo.png'
import clock from '../../assets/clock.png'

import './header.scss';

const Header = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  
  useEffect(() => {
    setCurrentDate(getDate());
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 60000);
    
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  },[])

  function getDate() {
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let monthIndex = today.getMonth();
    let month = monthNames[monthIndex].slice(0, 3).toUpperCase();
    let year = today.getFullYear();
    let date = today.getDate();

    return `${date} ${month}, ${year}`;
  }
  return (
    <div className='header'>
        <div className='header__container'>       
          <div className='header__image'>
            <img src={logo} alt='logo' />
          </div>
          <div className='header__filter'>
            <input
                className='header__filter--input'
                type='search'
                placeholder='Search'
                aria-label='Search'
              />
          </div>
          <div className='header__tools'>
            <div className='header__date'>
              <span>Today</span>
              <span>{currentDate}</span>
            </div>
            <div className='header__timer'>
              <img src={clock} alt='clock'/>
              <span>{currentTime}</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Header;