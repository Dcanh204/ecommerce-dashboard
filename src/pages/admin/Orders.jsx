import React, { useEffect, useState } from 'react';
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_admin_orders } from '../../stores/Reducers/orderReducer';
import { translateDeliveryStatus, translatePaymentStatus } from './../../utils/translateStatus';
import StatusBadge from '../../components/StatusBadge';
const Orders = () => {
  const dispatch = useDispatch();
  const { myOrders, totalOrders } = useSelector(state => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [showOrder, setShowOrder] = useState(null);

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
    }
    dispatch(get_admin_orders(obj))
  }, [currentPage, dispatch, debouncedSearch, parPage])

  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 rounded-md bg-[#6a5fdf]'>
        <div className='flex justify-between items-center '>
          <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-2 py-1 border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf] text-xs'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className='w-[250px] px-2 py-1 outline-none border border-slate-700 rounded-md bg-transparent focus:border-indigo-400 text-sm' type="text" name='search' placeholder='Tìm kiếm' />
        </div>

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full text-xs text-left text-[#d0d2d6]'>
            <thead className='border-b-2 border-slate-700 uppercase font-bold'>
              <tr>
                <th scope='col' className='px-4 py-2'>Mã đơn hàng</th>
                <th scope='col' className='px-4 py-2'>Khách hàng</th>
                <th scope='col' className='px-4 py-2'>Ngày đặt</th>
                <th scope='col' className='px-4 py-2'>Giá</th>
                <th scope='col' className='px-4 py-2'>Trạng thái thanh toán</th>
                <th scope='col' className='px-4 py-2'>Trạng thái đơn hàng</th>
                <th scope='col' className='px-4 py-2'>Hành động</th>
                <th scope='col' className='px-4 py-2'><BsArrowDownSquare className='w-[20px] h-[20px]' /></th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((o) => (
                <React.Fragment key={o._id}>
                  {/* ===== DÒNG ĐƠN CHÍNH ===== */}
                  <tr className='border-b border-slate-600'>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>
                      MDH - {o._id.slice(-6).toUpperCase()}
                    </td>
                    <td className='px-4 py-2'>{o.shippingInfo?.name}</td>
                    <td className='px-4 py-2'>
                      {new Date(o.date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className='px-4 py-2'>
                      {o.price.toLocaleString('vi-VN')} ₫
                    </td>
                    <td className='px-4 py-2'><StatusBadge type="payment" status={o.payment_status} /></td>
                    <td className='px-4 py-2'><StatusBadge type="delivery" status={o.delivery_status} /></td>
                    <td className='px-4 py-2 lg:px-10'>
                      <Link
                        to={`/admin/dashboard/orders/${o._id}`}
                        className='inline-block p-[6px] bg-green-500 rounded-md'
                      >
                        <FaEye />
                      </Link>
                    </td>
                    <td className='px-4 py-2'>
                      <BsArrowDownSquare
                        onClick={() =>
                          setShowOrder(showOrder === o._id ? null : o._id)
                        }
                        className='w-[20px] h-[20px] cursor-pointer'
                      />
                    </td>
                  </tr>
                  {showOrder === o._id &&
                    o.suborder?.map((sub, index) => (
                      <tr
                        key={index}
                        className='border-b border-slate-600 bg-[#8288ed]'
                      >
                        <td className='pl-6 px-4 py-2'>
                          └ {sub._id.slice(-6).toUpperCase()}
                        </td>
                        <td className='px-4 py-2'>{sub.shippingInfo?.name}</td>
                        <td className='px-4 py-2'>
                          {new Date(sub.date).toLocaleDateString('vi-VN')}
                        </td>
                        <td className='px-4 py-2'>
                          {sub.price.toLocaleString('vi-VN')} ₫
                        </td>
                        <td className='px-4 py-2'>{translatePaymentStatus(sub.payment_status)}</td>
                        <td colSpan={3} className='px-4 py-2'>
                          {translateDeliveryStatus(sub.delivery_status)}
                        </td>
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>

          </table>
        </div>

        <div className='w-full flex justify-end mt-4'>
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