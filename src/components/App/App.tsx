import Header from '../Header/Header'
import NavigationMenu from '../NavigationMenu/NavigationMenu'
import Sidebar from '../SideBar/Sidebar'

import './App.scss'

function App() {

  return (
    <>
       <div className='app'>
        <Header />
        <div className='app__body'>
          <Sidebar />
          <NavigationMenu />
        </div>
      </div>
    </>
  )
}

export default App
