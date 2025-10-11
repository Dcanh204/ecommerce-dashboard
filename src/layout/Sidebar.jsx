import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getNav } from '../navigation';
import { BiLogOutCircle } from "react-icons/bi";
const Sidebar = () => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    const navs = getNav('admin');
    setAllNav(navs);
  }, [])

  return (
    <div>
      <div className={`w-[260px] fixed z-50 bg-[#e6e7fb] top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all`}>
        <div className='h-[70px] flex justify-center items-center '>
          <Link to='/' className='w-[180px] h-[50px]'>
            <img className='w-full h-full' src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div>
          <ul className='px-[16px]'>
            {allNav.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={item.path} className={`${pathname === item.path ? 'bg-blue-600 text-white shadow-indigo-500/50 duration-500 ' : 'text-[#030811] font-bold duration-200'} flex justify-start items-center px-[12px] py-[9px] gap-[12px] w-full mb-1 hover:pl-4 transition-all rounded-sm `}>
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}

            <li>
              <button className='text-[#030811] font-bold duration-200 flex justify-start items-center px-[12px] py-[9px] gap-[12px] w-full mb-1 hover:pl-4 transition-all rounded-sm'>
                <span><BiLogOutCircle /></span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;