import React, { useEffect, useState } from 'react';
import { Form, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaImage } from "react-icons/fa";
import Pagination from '../../components/Pagination';
import { IoIosCloseCircleOutline, IoMdVolumeHigh } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, deleteCategory, getCategory, messageClear, updateCategory } from '../../stores/Reducers/categoryReducer';
import toast from 'react-hot-toast';
import Search from '../../components/Search';
const Category = () => {
  const dispatch = useDispatch();
  const { loading, successMessage, errorMessage, categories, totalCategories } = useSelector(state => state.category);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [show, setShow] = useState(false)
  const [parPage, setParPage] = useState(5);
  const [imageShow, setImageShow] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);
  const [state, setState] = useState({
    category_name: '',
    image: ''
  })

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]));
      setState(prev => ({
        ...prev,
        image: files[0]
      }))
    }
  }

  const addOrUpdateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category_name', state.category_name);
    if (state.image) {
      formData.append('image', state.image);
    }
    if (isEdit) {
      dispatch(updateCategory({ id: editId, formData }))
    } else {
      await dispatch(addCategory(formData)).unwrap();
      const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
      }
      dispatch(getCategory(obj))
    }

  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage)
      dispatch(messageClear());
      setState({
        category_name: '',
        image: ''
      })
      setEditId(null);
      setIsEdit(false);
      setImageShow('');
    }
    if (errorMessage) {
      toast.error(errorMessage)
      dispatch(messageClear())
    }
  }, [errorMessage, successMessage, dispatch])

  // dùng useDebouce để khi người dừng search 300ms mới tìm kiếm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue])


  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue: debouncedSearch
    }
    dispatch(getCategory(obj))
  }, [parPage, currentPage, debouncedSearch, dispatch])

  const handleEdit = (category) => {
    setState({
      category_name: category.category_name,
      image: null
    });
    setImageShow(category.image);
    setEditId(category._id)
    setIsEdit(true);
    setShow(true);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      await dispatch(deleteCategory(id)).unwrap();
      const obj = {
        parPage: parseInt(parPage),
        page: parseInt(currentPage),
        searchValue
      }
      dispatch(getCategory(obj))
    }
  }
  return (
    <div className='px-2 lg:px-7 mt-5'>
      <div className='flex lg:hidden justify-between items-center p-4 mb-5 bg-[#6a5fdf] rounded-md'>
        <h1 className='text-[#d0d2d6] font-semibold text-base'>Danh mục</h1>
        <button onClick={() => setShow(true)} className='bg-red-500 rounded-md hover:bg-red-500/40 px-4 py-2 text-white cursor-pointer text-base'>Thêm</button>
      </div>
      <div className='w-full flex flex-wrap'>
        <div className='w-full lg:w-7/12 bg-[#6a5fdf] rounded-md p-4'>
          <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />
          <div className='overflow-x-auto'>
            <table className='w-full text-xs text-left text-[#d0d2d6]'>
              <thead className='uppercase border-b border-slate-700'>
                <tr>
                  <th scope='col' className='py-3 px-4'>STT</th>
                  <th scope='col' className='py-3 px-4'>Ảnh</th>
                  <th scope='col' className='py-3 px-4'>Tên danh mục</th>
                  <th scope='col' className='py-3 px-4'>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item, index) =>
                  <tr key={index}>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{index + 1}</td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                      <img className='w-[50px] h-[50px]' src={item.image} alt="category" />
                    </td>
                    <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>{item.category_name}</td>
                    <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                      <Link onClick={() => handleEdit(item)} className='inline-block justify-start  items-center mr-4 p-[6px] bg-yellow-500 rounded-md hover:shadow-lg hover:bg-yellow-500/50 '><FaEdit /></Link>
                      <Link onClick={() => handleDelete(item._id)} className='inline-block justify-start  items-center p-[6px] bg-red-500 rounded-md hover:shadow-lg hover:bg-red-500/50 '><FaTrash /></Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='w-full flex justify-end mt-2 '>
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalCategories}
              parPage={parPage}
              showItem={3}
            />
          </div>
        </div>

        <div className={`w-[320px] lg:w-5/12 lg:relative lg:right-0 fixed ${show ? 'right-0' : '-right-[340px]'} z-[999] top-0 transition-all duration-500`}>
          <div className='w-full pl-5'>
            <div className='w-full bg-[#6a5fdf] rounded-md h-screen lg:h-auto px-3 py-2 lg:rounded-md text-[#d0d2d6]'>
              <div className='flex justify-between items-center'>
                <h1 className='text-[#d2d0d6] font-semibold text-xl mb-4 w-full text-center'>{isEdit ? 'Sửa danh mục' : 'Thêm danh mục'}</h1>
                <button onClick={() => setShow(false)} className='lg:hidden cursor-pointer'>
                  <IoIosCloseCircleOutline className='w-[20px] h-[20px] hover:bg-red-400 rounded-full' />
                </button>
              </div>


              <form onSubmit={addOrUpdateCategory}>
                <div className='flex flex-col w-full gap-1 mb-3'>
                  <label htmlFor="name">Tên danh mục</label>
                  <input value={state.category_name} onChange={inputHandle} className='px-3 py-1 text-sm border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" id='name' name='category_name' placeholder='Tên danh mục' />
                </div>

                <div>
                  <label className='flex flex-col justify-center items-center w-full h-[330px] border border-dashed border-[#d0d2d6] cursor-pointer hover:border-red-400' htmlFor="image">
                    {
                      imageShow
                        ? <img className='w-full h-full' src={imageShow} />
                        : <>
                          <span><FaImage /></span>
                          <span>Chọn ảnh</span>
                        </>
                    }
                  </label>
                  <input onChange={imageHandle} className='hidden' type="file" id='image' name='image' />
                </div>

                <button disabled={loading} className='bg-red-500 w-full hover:shadow-red-500/40 hover:shadow-md text-white rounded-md px-7 py-2 my-4 cursor-pointer'>
                  {
                    loading ? <ClipLoader color='white' /> : isEdit ? 'Cập nhật' : 'Thêm danh mục'
                  }
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