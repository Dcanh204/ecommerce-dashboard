import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import Search from './../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { get_seller_request } from '../../stores/Reducers/sellerReducer';
import { ClipLoader } from 'react-spinners';
const SellerRequest = () => {
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
      status: 'pending'
    }
    dispatch(get_seller_request(obj))
  }, [currentPage, dispatch, debouncedSearch, parPage])



  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='font-bold text-lg mb-3'>Yều cầu của người bán</h1>
      <div className='w-full bg-[#6a5fdf] rounded-md p-4'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
        <div className='overflow-x-auto'>
          <table className='w-full text-xs text-left text-[#d0d2d6]'>
            <thead className='uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>STT</th>
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
                  <td colSpan="6" className="py-10">
                    <div className="flex justify-center items-center w-full">
                      <ClipLoader color="#d0d2d6" />
                    </div>
                  </td>
                </tr>
              ) : (sellers.map((item, index) =>
                <tr className='border-b border-slate-700' key={index}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item?.name}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item?.email}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap capitalize '>{item?.payment}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap capitalize'>{item?.status}</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link to={`/admin/dashboard/sellers/${item._id}`} className='inline-block p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-400/50 '><FaEye /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {
          totalSellers <= parPage
            ? ''
            :
            <div className='w-full flex justify-end mt-2'>
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalSellers}
                parPage={parPage}
                showItem={3}
              />
            </div>
        }

      </div>
    </div>
  );
};

export default SellerRequest;