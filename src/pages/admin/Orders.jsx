import React, { useState } from 'react';
import { BsArrowDownSquare } from "react-icons/bs";
import { Link } from 'react-router-dom';
const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [parPage, setParPage] = useState(5);
  const [showOrder, setShowOrder] = useState(null);
  console.log(searchValue)
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 rounded-md bg-[#6a5fdf]'>
        <div className='flex justify-between items-center'>
          <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-3 py-2 border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input onChange={(e) => setSearchValue(e.target.value)} className='w-[250px] px-3 py-2 outline-none border border-slate-700 rounded-md bg-transparent focus:border-indigo-400' type="text" name='search' placeholder='Tìm kiếm' />
        </div>

        <div className='mt-4 overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='border-b-2 border-slate-700 uppercase font-bold'>
              <tr>
                <th scope='col' className='px-4 py-2'>Mã đơn hàng</th>
                <th scope='col' className='px-4 py-2'>Giá</th>
                <th scope='col' className='px-4 py-2'>Trạng thái thanh toán</th>
                <th scope='col' className='px-4 py-2'>Trạng thái đơn hàng</th>
                <th scope='col' className='px-4 py-2'>Hoạt động</th>
                <th scope='col' className='px-4 py-2'><BsArrowDownSquare className='w-[20px] h-[20px]' /></th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-slate-600'>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>MDH-001</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                <td className='px-4 py-2 lg:px-10 font-medium whitespace-nowrap'>
                  <Link>Xem</Link>
                </td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>
                  <BsArrowDownSquare onClick={() => setShowOrder(showOrder === 'MDH-001' ? null : 'MDH-001')} className='w-[20px] h-[20px]
                  cursor-pointer' />
                </td>
              </tr>
              {showOrder === 'MDH-001' &&
                <>
                  <tr className={'border-b border-slate-600 bg-[#8288ed]'}>
                    <td className='pl-6 px-4 py-2 font-medium whitespace-nowrap'>MDH-001</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                    <td colSpan={3} className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  </tr>
                  <tr className={'border-b border-slate-600 bg-[#8288ed]'}>
                    <td className='pl-6 px-4 py-2 font-medium whitespace-nowrap'>MDH-001</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                    <td colSpan={3} className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  </tr>
                </>
              }
              <tr className='border-b border-slate-600'>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>MDH-002</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                <td className='px-4 py-2 lg:px-10 font-medium whitespace-nowrap'>
                  <Link>Xem</Link>
                </td>
                <td className='px-4 py-2 font-medium whitespace-nowrap'>
                  <BsArrowDownSquare onClick={() => setShowOrder(!showOrder)} className='w-[20px] h-[20px]
                  cursor-pointer' />
                </td>
              </tr>
              {showOrder === 'MDH-002' &&
                <>
                  <tr className={'border-b border-slate-600 bg-[#8288ed]'}>
                    <td className='pl-6 px-4 py-2 font-medium whitespace-nowrap'>MDH-002</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                    <td colSpan={3} className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  </tr>
                  <tr className={'border-b border-slate-600 bg-[#8288ed]'}>
                    <td className='pl-6 px-4 py-2 font-medium whitespace-nowrap'>MDH-002</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>2.000.000đ</td>
                    <td className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                    <td colSpan={3} className='px-4 py-2 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  </tr>
                </>
              }


            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;