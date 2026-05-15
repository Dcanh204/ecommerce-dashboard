import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerById, messageClear, updateStatus } from '../../stores/Reducers/sellerReducer';
import { useParams } from 'react-router-dom';
import { CiImageOff } from "react-icons/ci";
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import StatusBadge from '../../components/StatusBadge';
const SellerDetails = () => {

  const dispatch = useDispatch();
  const { seller, successMessage, loading } = useSelector(state => state.seller);
  const sellerId = useParams().id;
  const [status, setStatus] = useState('');
  useEffect(() => {
    dispatch(getSellerById(sellerId))
  }, [sellerId, dispatch])

  const update_status = (e) => {
    e.preventDefault();
    dispatch(updateStatus({ sellerId, status }))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch])

  useEffect(() => {
    if (seller) {
      setStatus(seller?.status)
    }
  }, [seller])

  return (
    <div className='px-2 lg:px-7 py-5'>
      <h1 className='font-bold text-[25px] mb-3'>Chi tiết người bán</h1>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='w-full flex flex-wrap text-[#d0d2d6]'>
          <div className='w-full lg:w-3/12 flex justify-center items-center py-4'>
            <div className='w-[230px] h-[230px]'>
              {
                seller?.image
                  ? <img className='w-full h-full rounded-lg' src={seller?.image} alt="" />
                  : <label className='flex flex-col justify-center items-center w-full h-full border border-dashed border-[#d0d2d6]' >
                    <span><CiImageOff size={50} /></span>
                  </label>
              }

            </div>
          </div>
          <div className='w-full lg:w-4/12'>
            <div className='px-0 md:px-5 py-2'>
              <div className='py-2 text-lg'>
                <h2>Thông tin cơ bản</h2>
              </div>
              <div className='flex justify-between gap-2 flex-col text-base p-4 bg-[#9e97e9] rounded-md'>
                <div className='flex gap-2  text-black'>
                  <span className='font-bold'>Họ tên: </span>
                  <span>{seller?.name}</span>
                </div>
                <div className='flex gap-2 text-black'>
                  <span className='font-bold'>Email: </span>
                  <span>{seller?.email}</span>
                </div>
                <div className='flex gap-2 text-black'>
                  <span className='font-bold'>Vai trò: </span>
                  <span className='capitalize'>{seller?.role}</span>
                </div>
                <div className='flex gap-2 text-black'>
                  <span className='font-bold'>Trạng thái: </span>
                  <span className='capitalize'><StatusBadge type="user" status={seller?.status} /></span>
                </div>
                <div className='flex gap-2  text-black'>
                  <span className='font-bold'>Trạng thái thanh toán: </span>
                  <span className='capitalize'><StatusBadge type="payment_account" status={seller?.payment} /></span>
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
                <div className='flex gap-2  text-black'>
                  <span className='font-bold'>Tên cửa hàng: </span>
                  <span>{seller?.shopInfo?.shopName}</span>
                </div>
                <div className='flex gap-2 text-black'>
                  <span className='font-bold'>Tỉnh / Thành phố: </span>
                  <span>{seller?.shopInfo?.city}</span>
                </div>
                <div className='flex gap-2 text-black'>
                  <span className='font-bold'>Địa chỉ: </span>
                  <span>{seller?.shopInfo?.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={update_status}>
          <div className='flex gap-4 py-2'>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className='px-2 py-1 text-xs border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]' name="" id="">
              <option value="">--Chọn trạng thái--</option>
              <option value="active">Hoạt động</option>
              <option value="deactive">Vô hiệu hóa</option>
            </select>
            <button disabled={loading} className='bg-red-500 max-w-[170px] hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-3 py-1'>
              {
                loading ? <ClipLoader color='white' /> : 'Cập nhật'
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerDetails;