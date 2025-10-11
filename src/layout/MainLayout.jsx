
import { Outlet } from 'react-router-dom';
import Header from './Header'
import Sidebar from './Sidebar';
const MainLayout = () => {
  return (
    <div className='bg-[#cdcae9] w-full min-h-screen'>
      <Header />
      <Sidebar />
      <main className='ml-0 lg:ml-[260px] pt-[95px] transition-all'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;