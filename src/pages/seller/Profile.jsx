import React, { useEffect, useState } from 'react';
import { FaImages } from "react-icons/fa";
import { ClipLoader, FadeLoader } from 'react-spinners'
import { FaEdit, FaEyeSlash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { messageClear, profile_image_upload, profile_info_add } from '../../stores/Reducers/authReducer';
import toast from 'react-hot-toast';
const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loadingProfile, successMessage, errorMessage } = useSelector(state => state.auth);
  const [show, setShow] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, setState] = useState({
    shopName: '',
    city: '',
    address: ''
  })

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const add_image = (e) => {
    const { files } = e.target;
    if (files.length <= 0) return;
    const formData = new FormData();
    formData.append('image', files[0]);
    dispatch(profile_image_upload(formData))
  }

  const add_profile_info = (e) => {
    e.preventDefault();
    dispatch(profile_info_add(state));
  }

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full lg:w-6/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
            <div className='flex justify-center items-center py-3'>
              {
                userInfo?.image
                  ? <label className='h-[200px] w-[200px] cursor-pointer relative p-3 overflow-hidden' htmlFor='img'>
                    <img className='w-full h-full rounded-lg' src={userInfo.image} alt='' />
                    {
                      loadingProfile && <div className='flex justify-center items-center absolute left-0 top-0 bg-slate-600 w-full h-full opacity-70 z-20'>
                        <FadeLoader />
                      </div>
                    }
                  </label>
                  : <label className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 relative' htmlFor='img'>
                    <span><FaImages /></span>
                    <span>Chọn ảnh</span>
                    {
                      loadingProfile && <div className='flex justify-center items-center absolute left-0 top-0 bg-slate-600 w-full h-full opacity-70 z-20'>
                        <FadeLoader />
                      </div>
                    }
                  </label>
              }
              <input onChange={add_image} type="file" id='img' className='hidden' />
            </div>

            <div className='px-0 md:px-5 py-2'>
              <div className='flex justify-center flex-col gap-2 p-4 text-sm bg-slate-800 rounded-md relative'>
                <span className='absolute top-2 right-2 z-20 bg-yellow-500 p-[6px] rounded-md shadow-yellow-500/50 hover:shadow-lg cursor-pointer'><FaEdit /></span>
                <div className='flex gap-3'>
                  <span className='font-bold'>Họ tên: </span>
                  <span>{userInfo.name}</span>
                </div>

                <div className='flex gap-3'>
                  <span className='font-bold'>Email: </span>
                  <span>{userInfo.email}</span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Vai trò: </span>
                  <span>{userInfo.role}</span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Trạng thái: </span>
                  <span>{userInfo.status}</span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Tài khoản thanh toán: </span>
                  {
                    userInfo.status === 'active' ? <span className='bg-red-500 text-white cursor-pointer  px-2  rounded-md'>{userInfo.payment}</span> : <span className='bg-blue-500 text-white cursor-pointer  px-2 rounded-md'>Kích hoạt ngay</span>
                  }
                </div>
              </div>
            </div>

            <div className='px-0 md:px-5 py-2'>
              {
                !userInfo?.shopInfo ? <form onSubmit={add_profile_info}>
                  <div className='flex flex-col w-full gap-1 mb-3 text-sm'>
                    <label htmlFor="shopName">Tên cửa hàng</label>
                    <input onChange={inputHandle} value={state.shopName} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='shopName' id='shopName' placeholder='Nhập tên cửa hàng' />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="city">Tỉnh / Thành phố</label>
                    <input onChange={inputHandle} value={state.city} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='city' id='city' placeholder='Nhập tỉnh hoặc thành phố' />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="address">Địa chỉ</label>
                    <input onChange={inputHandle} value={state.address} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='address' id='address' placeholder='Nhập địa chỉ' />
                  </div>
                  <div>
                    <button disabled={loadingProfile} className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-2 '>
                      {
                        loadingProfile ? <ClipLoader color='white' /> : 'Cập nhật'
                      }
                    </button>
                  </div>
                </form>
                  :
                  <div className='flex justify-center flex-col gap-2 p-4 text-base bg-slate-800 rounded-md relative'>
                    <span onClick={() => setShow(!show)} className='absolute top-2 right-2 z-20 bg-yellow-500 p-[6px] rounded-md shadow-yellow-500/50 hover:shadow-lg cursor-pointer text-sm'><FaEdit /></span>
                    <div className='flex gap-3'>
                      <span className='font-bold'>Tên cửa hàng: </span>
                      <span>{userInfo?.shopInfo?.shopName}</span>
                    </div>

                    <div className='flex gap-3'>
                      <span className='font-bold'>Tỉnh / Thành phố: </span>
                      <span>{userInfo?.shopInfo?.city}</span>
                    </div>
                    <div className='flex gap-3'>
                      <span className='font-bold'>Địa chỉ: </span>
                      <span>{userInfo?.shopInfo?.address}</span>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>

        <div className='w-full lg:w-6/12'>
          <div className='w-full pl-0 lg:pl-7 mt-6 lg:mt-0'>
            <div className='w-full p-4 rounded-md bg-[#6a5fdf] text-[#d0d2d6]'>
              <h2 className='font-medium text-xl text-[#d0d2d6] mb-4'>Thay đổi mật khẩu</h2>
              <form>
                <div className='flex flex-col w-full gap-1 mb-3 text-sm'>
                  <label htmlFor="email">Email</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="email" name='email' id='email' placeholder='Nhập email' />
                </div>
                <div className='flex flex-col w-full gap-1 mb-3 relative'>
                  <label htmlFor="oldPassword">Mật khẩu cũ</label>
                  <input className='pl-2 pr-14 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type={showOldPassword ? 'text' : 'password'} name='oldPassword' id='oldPassword' placeholder='Nhập mật khẩu cũ' />
                  {
                    showOldPassword ? <span onClick={() => setShowOldPassword(!showOldPassword)} className='flex justify-center items-center absolute z-10 top-10 right-5 cursor-pointer'><FaEyeSlash /></span>
                      :
                      <span onClick={() => setShowOldPassword(!showOldPassword)} className='flex justify-center items-center absolute top-10 right-5 z-10 cursor-pointer'><FaEye /></span>
                  }

                </div>
                <div className='flex flex-col w-full gap-1 mb-3 relative'>
                  <label htmlFor="newPassword">Mật khẩu mới</label>
                  <input className='pl-2 pr-14 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type={showNewPassword ? 'text' : 'password'} name='newPassword' id='newPassword' placeholder='Nhập mật khẩu mới' />
                  {
                    showNewPassword ? <span onClick={() => setShowNewPassword(!showNewPassword)} className='flex justify-center items-center absolute z-10 top-10 right-5 cursor-pointer'><FaEyeSlash /></span>
                      :
                      <span onClick={() => setShowNewPassword(!showNewPassword)} className='flex justify-center items-center absolute top-10 right-5 z-10 cursor-pointer'><FaEye /></span>
                  }
                </div>
                <div className='flex flex-col w-full gap-1 mb-3 relative'>
                  <label htmlFor="confirmNewWord">Nhập lại mật khẩu mới</label>
                  <input className='pl-2 pr-14 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type={showConfirmPassword ? 'text' : 'password'} name='confirmNewWord' id='confirmNewWord' placeholder='Nhập lại mật khẩu mới' />
                  {
                    showConfirmPassword ? <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='flex justify-center items-center absolute z-10 top-10 right-5 cursor-pointer'><FaEyeSlash /></span>
                      :
                      <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className='flex justify-center items-center absolute z-10 top-10 right-5 cursor-pointer'><FaEye /></span>
                  }
                </div>
                <div>
                  <button className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-2 '>Cập nhật</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;