import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { admin_order_status_update, get_admin_order, messageClear } from '../../stores/Reducers/orderReducer';
import toast from 'react-hot-toast';
import { translateDeliveryStatus } from './../../utils/translateStatus';

const OrderDetails = () => {
  const orderId = useParams().id;
  const dispatch = useDispatch();
  const { order, successMessage } = useSelector(state => state.order);
  const [status, setStatus] = useState('')

  const status_update = (e) => {
    dispatch(admin_order_status_update({ orderId, info: { status: e.target.value } }))
    setStatus(e.target.value);
  }
  useEffect(() => {
    setStatus(order?.delivery_status)
  }, [order])
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(get_admin_order(orderId))
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, orderId])

  useEffect(() => {
    dispatch(get_admin_order(orderId));
  }, [orderId, dispatch])
  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex flex-wrap'>
          <div className='w-full xl:w-[30%]'>
            <div className='p-5 border border-slate-200 rounded-md shadow-md'>
              <h2 className='font-medium  text-xl text-[#d0d2d6]'>Chi tiết đơn hàng</h2>
              <div className="text-[20px] mt-2 text-[#d0d2d6] flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">MDH - {order?._id?.slice(-6).toUpperCase()}</span>
                  <span>{new Date(order?.date)?.toLocaleDateString('vi-VN')}</span>
                </div>

                <div className='flex justify-between p-1 text-sm'>
                  <span className="font-medium">Người nhận: </span>
                  <span>{order?.shippingInfo?.name}</span>
                </div>

                <div className='flex justify-between p-1 text-sm'>
                  <span className="font-medium whitespace-nowrap">Địa chỉ: </span>
                  <span>{order.shippingInfo?.address}</span>
                </div>

                <div className="flex justify-between p-1 text-sm">
                  <span className="font-medium">Trạng thái:</span>
                  <span>{order?.payment_status}</span>
                </div>

                <div className='flex justify-between p-1 text-sm'>
                  <span className="font-medium">Tổng tiền: </span>
                  <span className="font-semibold">  {order?.price?.toLocaleString('vi-VN')} ₫</span>
                </div>
              </div>
              <div className='h-[2px] bg-white my-5'></div>
              {
                order.products && order.products.map((item) => <div key={item._id} className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-lg py-2 px-3 justify-center'>
                  <div className='flex gap-3 items-center'>
                    <img className='w-[50px] h-[50px]' src={item.images[0]} alt="" />
                    <div className='w-full flex justify-between items-center text-[#d0d2d6]'>
                      <div className='flex flex-col gap-1 text-xs'>
                        <h2>{item.name}</h2>
                        <span>{item.brand}</span>
                      </div>
                      <div className='flex items-center text-xs'>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                  </div>

                </div>)
              }
            </div>
          </div>

          <div className='w-full xl:w-[70%]'>
            <div className='pl-0 xl:pl-3 mt-3 lg:mt-0'>
              <div className='p-5 border border-slate-200 rounded-md shadow-md'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-medium  text-xl text-[#d0d2d6]'>Đơn hàng theo người bán</h2>
                  <select className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-sm text-[#d0d2d6]' value={status} onChange={status_update}>
                    <option value="pending">Chờ xử lý</option>
                    <option value="shipped">Đang giao</option>
                    <option value="delivered">Đã giao</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
                <div className='overflow-x-auto overflow-y-auto'>
                  <table className='w-full text-left bg-[#8288ed] rounded-md mt-3 text-xs'>
                    <thead>
                      <tr className='border-b border-slate-700'>
                        <th className='px-4 py-2 whitespace-nowrap'>Ảnh</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Tên sản phẩm</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Thương hiệu</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Số lượng</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Người bán</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order?.products?.map((item, index) =>
                        <tr key={index + 20} className='border-b border-slate-500'>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                            <img className='w-[50px] h-[50px]' src={item.images[0]} alt="" />
                          </td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.name}</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.brand}</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.quantity}</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Dinhcanh</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{translateDeliveryStatus(order.delivery_status)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;