
import React, { useEffect, useState } from 'react';
import Search from '../../components/Search';
import Pagination from '../../components/Pagination';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProduct, messageClear } from '../../stores/Reducers/productReducer';
import toast from 'react-hot-toast';
const Product = () => {

  const dispatch = useDispatch();
  const { products, totalProduct } = useSelector(state => state.product);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
  const [parPage, setParPage] = useState(5);
  const { successMessage, errorMessage } = useSelector(state => state.product);

  // trách gửi quá nhiều request tìm kiếm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue)
    }, 500)
    return () => clearTimeout(handler)
  })
  // lấy danh sách sản phẩm
  useEffect(() => {
    const obj = {
      parPage,
      page: currentPage,
      searchValue: debouncedSearch
    }
    dispatch(getProduct(obj))
  }, [debouncedSearch, parPage, currentPage, dispatch])
  //
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch])
  const handlerDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      await dispatch(deleteProduct(id)).unwrap();
      const obj = {
        parPage,
        page: currentPage,
        searchValue: debouncedSearch
      }
      dispatch(getProduct(obj))
    }
  }
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <h1 className='text-[#000000] font-semibold text-xl mb-3'>Tất cả sản phẩm</h1>
      <div className='w-full p-4 bg-[rgb(106,95,223)] rounded-md'>
        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
        <div className='overflow-x-auto'>
          <table className='w-full text-base text-left text-[#d0d2d6]'>
            <thead className='uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>STT</th>
                <th scope='col' className='py-3 px-4'>Ảnh</th>
                <th scope='col' className='py-3 px-4'>Tên sản phẩm</th>
                <th scope='col' className='py-3 px-4'>Danh mục</th>
                <th scope='col' className='py-3 px-4'>Thương hiệu</th>
                <th scope='col' className='py-3 px-4'>Giá</th>
                <th scope='col' className='py-3 px-4'>Giảm giá</th>
                <th scope='col' className='py-3 px-4'>Số lượng</th>
                <th scope='col' className='py-3 px-4'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((item, index) =>
                <tr key={item._id}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    <img className='w-[50px] h-[50px]' src={item.images[0]} alt={item.name} />
                  </td>
                  <td title={item.name} scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                    {item.name.length > 15 ? item?.name?.slice(0, 20) + '...' : item.name}
                  </td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.category}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.brand}</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{Number(item.price).toLocaleString('vi-VN')} đ</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.discount}%</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.stock}</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link to={`/seller/dashboard/products/edit/${item._id}`} className='inline-block justify-start  items-center mr-4 p-[6px] bg-yellow-500 rounded-md hover:shadow-lg hover:bg-yellow-500/50 '><FaEdit /></Link>
                    <Link className='inline-block justify-start  items-center mr-4 p-[6px] bg-green-500 rounded-md hover:shadow-lg hover:bg-green-500/50 '><FaEye /></Link>
                    <Link onClick={() => handlerDelete(item._id)} className='inline-block justify-start  items-center p-[6px] bg-red-500 rounded-md hover:shadow-lg hover:bg-red-500/50 '><FaTrash /></Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {
          totalProduct <= parPage
            ? ""
            :
            <div className='w-full flex justify-end mt-2'>
              <Pagination
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                totalItem={totalProduct}
                parPage={parPage}
                showItem={3}
              />
            </div>
        }

      </div>
    </div>
  );
};

export default Product;
