
import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_sellet_orders } from '../../stores/Reducers/orderReducer';
import { translateDeliveryStatus, translatePaymentStatus } from './../../utils/translateStatus';
const Orders = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { myOrders, totalOrders } = useSelector(state => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, 500)
    return () => clearTimeout(handler);
  }, [searchValue])

  useEffect(() => {
    const obj = {
      page: currentPage,
      parPage,
      searchValue: debouncedSearch,
      sellerId: userInfo._id
    }
    dispatch(get_sellet_orders(obj))
  }, [currentPage, dispatch, debouncedSearch, parPage, userInfo])
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-xl mb-3'>Tất cả sản phẩm</h1>
      <div className='w-full p-4 bg-[rgb(106,95,223)] rounded-md'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
        <div className='overflow-x-auto'>
          <table className='w-full text-xs text-left text-[#d0d2d6]'>
            <thead className='uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>Mã đơn hàng</th>
                <th scope='col' className='py-3 px-4'>Ngày đặt</th>
                <th scope='col' className='py-3 px-4'>Giá</th>
                <th scope='col' className='py-3 px-4'>Trạng thái thanh toán</th>
                <th scope='col' className='py-3 px-4'>Trạng thái đơn hàng</th>
                <th scope='col' className='py-3 px-4'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o, i) =>
                <tr key={i}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>MDH - {o._id.slice(-6).toUpperCase()}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{new Date(o.date).toLocaleDateString('vi-VN')}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{o.price.toLocaleString('vi-VN')} ₫</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{translatePaymentStatus(o.payment_status)}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{translateDeliveryStatus(o.delivery_status)}</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link to={`/seller/dashboard/orders/${o._id}`} className='inline-block justify-start  items-center mr-4 p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-500/50 '><FaEye /></Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='w-full flex justify-end mt-2'>
          {
            totalOrders > parPage && <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalOrders}
              parPage={parPage}
              showItem={3}
            />
          }

        </div>
      </div>
    </div>
  );
};

export default Orders;
