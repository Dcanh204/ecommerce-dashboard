
import React, { useState } from 'react';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
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
                <th scope='col' className='py-3 px-4'>Khách hàng</th>
                <th scope='col' className='py-3 px-4'>Ngày đặt</th>
                <th scope='col' className='py-3 px-4'>Giá</th>
                <th scope='col' className='py-3 px-4'>Trạng thái thanh toán</th>
                <th scope='col' className='py-3 px-4'>Trạng thái đơn hàng</th>
                <th scope='col' className='py-3 px-4'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item, index) =>
                <tr key={index}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>#MDH-001</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Nguyễn Đình Cảnh</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>30-09-2025</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>600.000đ</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chưa thanh toán</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link to={`/seller/dashboard/orders/3`} className='inline-block justify-start  items-center mr-4 p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-500/50 '><FaEye /></Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='w-full flex justify-end mt-2'>
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
