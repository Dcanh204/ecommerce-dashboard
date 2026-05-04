import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getNav } from '../navigation';
import { BiLogOutCircle } from "react-icons/bi";
import { useDispatch, useSelector } from 'react-redux';
import { logout, messageClear } from '../stores/Reducers/authReducer';
import toast from 'react-hot-toast';
const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { successMessage } = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  const { role } = useSelector(state => state.auth);

  useEffect(() => {
    const navs = getNav(role);
    setAllNav(navs);
  }, [role])

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
    }
  }, [dispatch, successMessage])

  return (
    <div>
      <div onClick={() => { setShowSidebar(false) }} className={`flex duration-200 w-screen h-screen top-0 left-0 cursor-pointer fixed z-10 bg-[#22292f80] ${!showSidebar ? 'invisible' : 'visible'}`}>
      </div>
      <div className={`w-[260px] fixed z-50 bg-[#e6e7fb] top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}>
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
                  <Link to={item.path} className={`${pathname === item.path ? 'bg-blue-600 text-white shadow-indigo-500/50 duration-500 ' : 'text-[#030811] font-bold duration-200'} flex justify-start items-center px-[12px] py-[9px] gap-[12px] w-full mb-1 hover:pl-4 transition-all rounded-sm text-sm`}>
                    <span>{item.icon}</span>
                    <span className='text-xs'>{item.title}</span>
                  </Link>
                </li>
              )
            })}

            <li>
              <button onClick={() => dispatch(logout({ navigate, role }))} className='text-[#030811] font-bold duration-200 flex justify-start items-center px-[12px] py-[9px] gap-[12px] w-full mb-1 hover:pl-4 transition-all rounded-sm text-sm cursor-pointer'>
                <span><BiLogOutCircle /></span>
                <span className='text-xs'>Đăng xuất</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;