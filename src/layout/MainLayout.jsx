
import { Outlet } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar';
import { useEffect, useState } from 'react';
import { socket } from '../utils/socket';
import { useSelector } from 'react-redux';

const MainLayout = () => {

  const [showSidebar, setShowSidebar] = useState(false);
  const { userInfo } = useSelector(state => state.auth)

  useEffect(() => {
    if (userInfo && userInfo.role === 'seller') {
      socket.emit('add_seller', userInfo._id, userInfo)
    } else {
      socket.emit('add_admin', userInfo)
    }
  }, [userInfo])
  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <main className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;