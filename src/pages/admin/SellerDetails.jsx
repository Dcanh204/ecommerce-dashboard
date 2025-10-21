import React from 'react';

const SellerDetails = () => {
  return (
    <div className='px-2 lg:px-7 py-5'>
      <h1 className='font-bold text-[25px] mb-3'>Chi tiết người bán</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-[#d0d2d6]'>
          <div className='w-full lg:w-3/12 flex justify-center items-center py-4'>
            <div className='w-[230px] h-[230px]'>
              <img className='w-full h-full rounded-lg' src="/images/demo.jpg" alt="demo" />
            </div>
          </div>
          <div className='w-full lg:w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Thông tin cơ bản</h2>
              </div>
              <div className='flex justify-between gap-2 flex-col text-base p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Họ tên: </span>
                  <span>Nguyễn Đình Cảnh</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Email: </span>
                  <span>Dinhcanhh2004@gmail.com</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Số điện thoại: </span>
                  <span>0387444214</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Vai trò: </span>
                  <span>Bán hàng</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Trạng thái: </span>
                  <span>Hoạt động</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Trạng thái thanh toán: </span>
                  <span>Hoạt động</span>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full lg:w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Địa chỉ</h2>
              </div>
              <div className='flex justify-between gap-2 flex-col text-base p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Tên cửa hàng: </span>
                  <span>Thế giới di dộng</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Tỉnh / Thành phố: </span>
                  <span>Bắc Ninh</span>
                </div>
                <div className='flex gap-2 font-bold text-black'>
                  <span>Khu vực: </span>
                  <span>TT Chờ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form>
          <div className='flex gap-4 py-3'>
            <select className='px-3 py-2 border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]' name="" id="">
              <option value="">--Chọn trạng thái--</option>
              <option value="active">Hoạt động</option>
              <option value="deactive">Vô hiệu hóa</option>
            </select>
            <button className='bg-red-500 w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2'>
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerDetails;