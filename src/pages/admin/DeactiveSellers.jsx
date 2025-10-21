import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
const DeactiveSellers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [parPage, setParPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='font-bold text-[25px] mb-3'>Vô hiệu hóa người bán</h1>
      <div className='w-full bg-[#6a5fdf] rounded-md p-4'>
        <div className='flex justify-between items-center'>
          <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-3 py-2 border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input onChange={(e) => setSearchValue(e.target.value)} className='w-[250px] px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='search' placeholder='Tìm kiếm' />
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-base text-left text-[#d0d2d6]'>
            <thead className='uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>STT</th>
                <th scope='col' className='py-3 px-4'>Ảnh</th>
                <th scope='col' className='py-3 px-4'>Họ và tên</th>
                <th scope='col' className='py-3 px-4'>Email</th>
                <th scope='col' className='py-3 px-4'>Trạng thái thanh toán</th>
                <th scope='col' className='py-3 px-4'>Trạng thái</th>
                <th scope='col' className='py-3 px-4'>Hành động</th>

              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item, index) =>
                <tr key={index}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[50px] h-[50px]' src={`/images/category/${item}.jpg`} alt="category" />
                  </td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Nguyễn Đình Cảnh</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Dinhcanh2004@gmail.com</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Vô hiệu hóa</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link className='inline-block p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-400/50 '><FaEye /></Link>
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

export default DeactiveSellers;