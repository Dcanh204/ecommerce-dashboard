import React, { useState } from 'react';
import { FaImages } from "react-icons/fa";
import { FadeLoader } from 'react-spinners'
import { FaEdit } from "react-icons/fa";
const Profile = () => {
  const image = true;
  const loader = true;
  const status = 'd';
  const [userInfo, setUserInfo] = useState(false)
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full flex flex-wrap'>
        <div className='w-full lg:w-6/12'>
          <div className='w-full p-4 bg-[#6a5fdf] rounded-md text-[#d0d2d6]'>
            <div className='flex justify-center items-center py-3'>
              {
                image ? <label className='h-[200px] w-[200px] cursor-pointer relative p-3 overflow-hidden' htmlFor='img'>
                  <img className='w-full h-full rounded-lg' src="/images/admin.jpg" alt="admin" />
                  {
                    !loader && <div className='flex justify-center items-center absolute left-0 top-0 bg-slate-600 w-full h-full opacity-70 z-20'>
                      <FadeLoader />
                    </div>
                  }
                </label>
                  : <label className='flex justify-center items-center flex-col h-[150px] w-[200px] cursor-pointer border border-dashed hover:border-red-500 relative' htmlFor='img'>
                    <span><FaImages /></span>
                    <span>Chọn ảnh</span>
                    {
                      loader && <div className='flex justify-center items-center absolute left-0 top-0 bg-slate-600 w-full h-full opacity-70 z-20'>
                        <FadeLoader />
                      </div>
                    }
                  </label>
              }
              <input type="file" id='img' className='hidden' />
            </div>

            <div className='px-0 md:px-5 py-2'>
              <div className='flex justify-center flex-col gap-2 p-4 text-base bg-slate-800 rounded-md relative'>
                <span className='absolute top-2 right-2 z-20 bg-yellow-500 p-[6px] rounded-md shadow-yellow-500/50 hover:shadow-lg cursor-pointer'><FaEdit /></span>
                <div className='flex gap-3'>
                  <span className='font-bold'>Họ tên: </span>
                  <span>Nguyễn Đình Cảnh </span>
                </div>

                <div className='flex gap-3'>
                  <span className='font-bold'>Email: </span>
                  <span>dinhcanhh2004@gmail.com </span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Vai trò: </span>
                  <span>Bán hàng </span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Trạng thái: </span>
                  <span>Hoạt động </span>
                </div>
                <div className='flex gap-3'>
                  <span className='font-bold'>Tài khoản thanh toán: </span>
                  {
                    status === 'active' ? <span className='bg-green-500 text-white cursor-pointer  px-2  rounded-md'>Chờ xử lý</span> : <span className='bg-blue-500 text-white cursor-pointer  px-2 rounded-md'>Kích hoạt ngay</span>
                  }
                </div>
              </div>
            </div>

            <div className='px-0 md:px-5 py-2'>
              {
                userInfo ? <from>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="shopname">Tên cửa hàng</label>
                    <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='shopname' id='shopname' placeholder='Nhập tên cửa hàng' />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="city">Tỉnh / Thành phố</label>
                    <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='city' id='city' placeholder='Nhập tỉnh hoặc thành phố' />
                  </div>
                  <div className='flex flex-col w-full gap-1 mb-3'>
                    <label htmlFor="address">Địa chỉ</label>
                    <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='address' id='address' placeholder='Nhập địa chỉ' />
                  </div>
                  <div>
                    <button onClick={() => setUserInfo(!userInfo)} className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-2 '>Cập nhật</button>
                  </div>
                </from>
                  :
                  <div className='flex justify-center flex-col gap-2 p-4 text-base bg-slate-800 rounded-md relative'>
                    <span onClick={() => setUserInfo(!userInfo)} className='absolute top-2 right-2 z-20 bg-yellow-500 p-[6px] rounded-md shadow-yellow-500/50 hover:shadow-lg cursor-pointer'><FaEdit /></span>
                    <div className='flex gap-3'>
                      <span className='font-bold'>Tên cửa hàng: </span>
                      <span>Eazy Shop </span>
                    </div>

                    <div className='flex gap-3'>
                      <span className='font-bold'>Tỉnh / Thành phố: </span>
                      <span>Bắc Ninh</span>
                    </div>
                    <div className='flex gap-3'>
                      <span className='font-bold'>Địa chỉ: </span>
                      <span>Yên Vĩ - Tam Giang - Bắc Ninh </span>
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
              <from>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="email">Email</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="email" name='email' id='email' placeholder='Nhập email' />
                </div>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="oldPassword">Mật khẩu cũ</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="password" name='oldPassword' id='oldPassword' placeholder='Nhập mật khẩu cũ' />
                </div>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="newPassword">Mật khẩu mới</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="password" name='newPassword' id='newPassword' placeholder='Nhập mật khẩu mới' />
                </div>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="compassNewWord">Nhập lại mật khẩu mới</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="password" name='compassNewWord' id='compassNewWord' placeholder='Nhập lại mật khẩu mới' />
                </div>
                <div>
                  <button onClick={() => setUserInfo(!userInfo)} className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-2 '>Cập nhật</button>
                </div>
              </from>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;