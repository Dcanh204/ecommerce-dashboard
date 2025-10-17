import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import Pagination from '../../components/Pagination';
import { IoIosCloseCircleOutline } from "react-icons/io";
const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState(false)
  const [parPage, setParPage] = useState(5);
  return (
    <div className='px-2 lg:px-7 mt-5'>
      <div className='flex lg:hidden justify-between items-center p-4 mb-5 bg-[#6a5fdf] rounded-md'>
        <h1 className='text-[#d0d2d6] font-semibold text-lg'>Danh mục</h1>
        <button onClick={() => setShow(true)} className='bg-red-500 rounded-md hover:bg-red-500/40 px-4 py-2 text-white cursor-pointer text-base'>Thêm</button>
      </div>
      <div className='w-full flex flex-wrap'>
        <div className='w-full lg:w-7/12 bg-[#6a5fdf] rounded-md p-4'>
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
                  <th scope='col' className='py-3 px-4'>Tên danh mục</th>
                  <th scope='col' className='py-3 px-4'>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item, index) =>
                  <tr key={index}>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item}</td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                      <img className='w-[50px] h-[50px]' src={`/images/category/${item}.jpg`} alt="category" />
                    </td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Giày thể thao</td>
                    <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                      <Link className='inline-block justify-start  items-center mr-4 p-[6px] bg-yellow-500 rounded-md hover:shadow-lg hover:bg-yellow-500/50 '><FaEdit /></Link>
                      <Link className='inline-block justify-start  items-center p-[6px] bg-red-500 rounded-md hover:shadow-lg hover:bg-red-500/50 '><FaTrash /></Link>
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

        <div className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[999] top-0 transition-all duration-500`}>
          <div className='w-full pl-5'>
            <div className='w-full bg-[#6a5fdf] rounded-md h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
              <div className='flex justify-between items-center'>
                <h1 className='text-[#d2d0d6] font-semibold text-xl mb-4 w-full text-center'>Thêm danh mục</h1>
                <button onClick={() => setShow(false)} className='lg:hidden cursor-pointer'>
                  <IoIosCloseCircleOutline className='w-[20px] h-[20px] hover:bg-red-400 rounded-full' />
                </button>
              </div>


              <form>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="name">Tên danh mục</label>
                  <input className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" id='name' name='category_name' placeholder='Tên danh mục' />
                </div>

                <div>
                  <label className='flex flex-col justify-center items-center w-full h-[330px] border border-dashed border-[#d0d2d6] cursor-pointer hover:border-red-400' htmlFor="image">
                    <span><FaImage /></span>
                    <span>Chọn ảnh</span>
                  </label>
                  <input className='hidden' type="file" id='image' name='image' />
                </div>

                <button className='bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-4'>
                  Thêm danh mục
                </button>

              </form>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Category;