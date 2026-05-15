import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_request } from '../../stores/Reducers/sellerReducer';
import StatusBadge from '../../components/StatusBadge';
import { ClipLoader } from 'react-spinners';
const DeactiveSellers = () => {
  const dispatch = useDispatch();
  const { sellers, totalSellers, loading } = useSelector(state => state.seller);
  const [currentPage, setCurrentPage] = useState(1)
  const [parPage, setParPage] = useState(5);
  const [searchValue, setSearchValue] = useState('');
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
      status: 'deactive'
    }
    dispatch(get_seller_request(obj))
  }, [currentPage, dispatch, debouncedSearch, parPage])
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='font-bold text-[25px] mb-3'>Vô hiệu hóa người bán</h1>
      <div className='w-full bg-[#6a5fdf] rounded-md p-4'>
        <div className='flex justify-between items-center'>
          <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-2 py-1 text-xs border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <input onChange={(e) => setSearchValue(e.target.value)} className='w-[250px] px-2 py-1 text-sm border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='search' placeholder='Tìm kiếm' />
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs text-left text-[#d0d2d6]'>
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
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-10">
                    <div className="flex justify-center items-center w-full">
                      <ClipLoader color="#d0d2d6" />
                    </div>
                  </td>
                </tr>
              ) : (sellers.map((item, index) =>
                <tr key={index}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[50px] h-[50px]' src={item.image?.trim() ? item.image : "/images/seller.png"} alt="avatar" />
                  </td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.name}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.email}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'><StatusBadge type="payment_account" status={item?.payment} /></td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'><StatusBadge type="user" status={item.status} /></td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link to={`/admin/dashboard/sellers/${item._id}`} className='inline-block p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-400/50 '><FaEye /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='w-full flex justify-end mt-2'>
          {
            totalSellers > parPage && <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalSellers}
              parPage={parPage}
              showItem={3}
            />
          }

        </div>
      </div>
    </div>
  );
};

export default DeactiveSellers;