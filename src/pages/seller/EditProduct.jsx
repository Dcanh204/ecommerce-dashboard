import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../stores/Reducers/categoryReducer';
import { getProductById, messageClear, updateImage, updateProduct } from '../../stores/Reducers/productReducer';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
const EditProduct = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { product, loading, successMessage, errorMessage } = useSelector(state => state.product);

  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allCategory, setAllCategory] = useState(categories);
  const [state, setState] = useState({
    name: "",
    brand: "",
    price: "",
    discount: "",
    description: "",
    stock: ""
  })

  // gửi dữ liệu để danh sách danh mục
  useEffect(() => {
    dispatch(getCategory({
      searchValue: '',
      page: '',
      parPage: ''
    }))
  }, [searchValue, dispatch])
  // đổ vào danh mục
  useEffect(() => {
    setAllCategory(categories);
  }, [categories])

  useEffect(() => {
    dispatch(getProductById(id))
  }, [dispatch, id]);

  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
      setState({
        name: product.name,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        description: product.description,
        stock: product.stock
      })
      setCategory(product.category)
      setImageShow(
        product.images
      )
    }


  }, [product]);
  // lọc bỏ dấu 
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const categorySearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value) {
      const srcValue = categories.filter(c =>
        removeAccents(c.name.toLowerCase()).includes(removeAccents(value.toLowerCase()))
      );
      setAllCategory(srcValue)
    } else {
      setAllCategory(categories)
    }
  }

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const [imageShow, setImageShow] = useState([])


  const changeImage = (img, files) => {
    if (files.length <= 0) return;
    const formData = new FormData();
    formData.append('oldImage', img);
    formData.append('newImage', files[0]);
    dispatch(updateImage({ id, formData }))
  }

  // update
  const update_product = (e) => {
    e.preventDefault();
    const obj = {
      name: state.name,
      brand: state.brand,
      price: state.price,
      discount: state.discount || 0,
      description: state.description,
      stock: state.stock,
      category: category,
      id
    }
    dispatch(updateProduct(obj))
  }

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear())
    }
  }, [successMessage, errorMessage, dispatch])



  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='font-semibold text-[#d0d2d6] text-xl'>Sửa sản phẩm</h2>
          <Link to='/seller/dashboard/products' className='bg-blue-500 shadow-blue-500/50 hover:shadow-lg rounded-md text-white px-7 py-2'>Tất cả sản phẩm</Link>
        </div>

        <div>
          <form onSubmit={update_product}>
            <div className='w-full flex flex-col md:flex-row gap-4 text-[#d0d2d6] mb-3'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="name">Tên sản phẩm</label>
                <input onChange={inputHandle} value={state.name} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='name' id='name' placeholder='Nhập tên sản phẩm' />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="brand">Tên thương hiệu</label>
                <input onChange={inputHandle} value={state.brand} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='brand' id='brand' placeholder='Nhập tên thương hiệu' />
              </div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-4 text-[#d0d2d6] mb-3'>
              <div className='flex flex-col w-full gap-1 relative'>
                <label htmlFor="category">Danh mục</label>
                <input onClick={() => setCateShow(!cateShow)} value={category} readOnly className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='category' id='category' placeholder='-- Chọn danh mục --' />
                <div className={`absolute z-20 top-[101%] w-full bg-[#475569] transition-all ${cateShow ? 'scale-100' : 'scale-0'} duration-300 over`}>
                  <div className='w-full px-4 py-2'>
                    <input onChange={categorySearch} className='w-full px-3 py-1 focus:border-indigo-500 outline-none bg-transparent  border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Tìm kiếm' />
                  </div>
                  <div className='flex flex-col justify-start items-start h-[170px] overflow-y-auto'>
                    {
                      allCategory.map((item, index) => <span key={index} className={`px-4 py-2 hover:bg-indigo-500 hover:text-white w-full cursor-pointer`} onClick={() => {
                        setCateShow(false)
                        setCategory(item.category_name)
                        setSearchValue('')
                        setAllCategory(categories)
                      }}>
                        {item.category_name}
                      </span>)
                    }
                  </div>

                </div>
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="stock">Số lượng sản phẩm</label>
                <input onChange={inputHandle} value={state.stock} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='stock' id='stock' placeholder='Nhập số lượng sản phẩm' />
              </div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-4 text-[#d0d2d6] mb-3'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="price">Giá</label>
                <input onChange={inputHandle} value={state.price} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="number" name='price' id='price' placeholder='Nhập giá sản phẩm' />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="discount">Giảm giá</label>
                <input onChange={inputHandle} value={state.discount} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="number" name='discount' id='discount' placeholder='% Nhập phần trăm giảm giá' />
              </div>
            </div>

            <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
              <label htmlFor="description">Mô tả</label>
              <textarea onChange={inputHandle} value={state.description} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="type" name='description' id='description' placeholder='Nhập mô tả' cols={10} rows={4} />
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4 lg:gap-4 xl:gap-5 gap-3 w-full text-[#d0d2d6]'>
              {
                imageShow.map((img, index) => <div key={index} className='h-[190px] relative'>
                  <label htmlFor={index} className='cursor-pointer'>
                    <img className='w-full h-full rounded-md' src={img} id='index' />
                  </label>
                  <input onChange={(e) => changeImage(img, e.target.files)} type="file" id={index} className='hidden' />
                </div>)
              }
            </div>
            <div className='flex justify-center md:justify-start'>
              <button disabled={loading} className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-3 my-3 cursor-pointer w-[200px]'>
                {
                  loading ? <ClipLoader color='white' /> : 'Cập nhật'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default EditProduct;