import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdImages, IoMdCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getCategory } from '../../stores/Reducers/categoryReducer';
import { addProduct, messageClear } from '../../stores/Reducers/productReducer';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
const AddProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const { loading, successMessage, errorMessage } = useSelector(state => state.product);

  // gửi dispatch yêu cầu lấy danh sách
  useEffect(() => {
    dispatch(getCategory({ parPage: '', page: '', searchValue: '' }));
  }, [dispatch]);


  const [cateShow, setCateShow] = useState(false);
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [allCategory, setAllCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([])
  const [state, setState] = useState({
    name: "",
    brand: "",
    price: "",
    discount: "",
    description: "",
    stock: ""
  })

  // set danh sách danh mục
  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);
  //lấy thông báo
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        brand: "",
        price: "",
        discount: "",
        description: "",
        stock: ""
      })
      setCategory('');
      setImageShow([])
      setImages([])
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [errorMessage, successMessage, dispatch])
  // lọc bỏ dấu 
  const removeAccents = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const categorySearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value) {
      const srcValue = categories.filter(c =>
        removeAccents(c.category_name.toLowerCase()).includes(removeAccents(value.toLowerCase()))
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

  const imageHandle = (e) => {
    const { files } = e.target;

    if (files.length > 0) {
      setImages([...images, ...files]);
      let imageUrl = []
      for (let i = 0; i < files.length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) })
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
  }
  const changeImage = (img, index) => {
    if (!img) return;
    const newImage = [...images];
    const newImageShow = [...imageShow];

    newImage[index] = img;
    newImageShow[index] = { url: URL.createObjectURL(img) };
    setImages(newImage);
    setImageShow(newImageShow);
  }

  const removeImage = (i) => {
    const filterImage = images.filter((_, index) => index !== i);
    const filterImageShow = imageShow.filter((_, index) => index !== i);
    setImages(filterImage);
    setImageShow(filterImageShow);
  }

  // gửi dữ liệu đến reducer
  const add_product = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', state.name);
    formData.append('brand', state.brand);
    formData.append('price', state.price);
    formData.append('discount', state.discount);
    formData.append('description', state.description);
    formData.append('stock', state.stock);
    formData.append('category', category);
    formData.append('shopName', "TheGioiDiDong");

    images.forEach(item => {
      formData.append('images', item);
    });
    dispatch(addProduct(formData))
  }

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='font-semibold text-[#d0d2d6] text-xl'>Thêm sản phẩm</h2>
          <Link to='/seller/dashboard/products' className='bg-blue-500 shadow-blue-500/50 hover:shadow-lg rounded-md text-white px-7 py-2'>Tất cả sản phẩm</Link>
        </div>

        <div>
          <form onSubmit={add_product}>
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
                <div className={`absolute z-20 top-[101%] w-full bg-[#475569] transition-all ${cateShow ? 'scale-100' : 'scale-0'} duration-300`}>
                  <div className='w-full px-4 py-2'>
                    <input onChange={categorySearch} className='w-full px-3 py-1 focus:border-indigo-500 outline-none bg-transparent  border border-slate-700 rounded-md text-[#d0d2d6]' type="text" placeholder='Tìm kiếm' value={searchValue} />
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
                <input min={0} onChange={inputHandle} value={state.stock} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='stock' id='stock' placeholder='Nhập số lượng sản phẩm' />
              </div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-4 text-[#d0d2d6] mb-3'>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="price">Giá</label>
                <input min={0} onChange={inputHandle} value={state.price} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="number" name='price' id='price' placeholder='Nhập giá sản phẩm' />
              </div>
              <div className='flex flex-col w-full gap-1'>
                <label htmlFor="discount">Giảm giá</label>
                <input min={0} onChange={inputHandle} value={state.discount} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="number" name='discount' id='discount' placeholder='% Nhập phần trăm giảm giá' />
              </div>
            </div>

            <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
              <label htmlFor="description">Mô tả</label>
              <textarea onChange={inputHandle} value={state.description} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="type" name='description' id='description' placeholder='Nhập mô tả' cols={10} rows={4} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4 lg:gap-4 xl:gap-5 gap-3 w-full text-[#d0d2d6]'>
              {
                imageShow.map((img, index) => <div key={index} className='h-[190px] relative'>
                  <label htmlFor={index} className='cursor-pointer'>
                    <img className='w-full h-full rounded-md' src={img.url} id='index' />
                  </label>
                  <input onChange={(e) => changeImage(e.target.files[0], index)} type="file" id={index} className='hidden' />
                  <span onClick={() => removeImage(index)} className='absolute top-2 right-2 cursor-pointer p-1 z-10 bg-slate-500 rounded-full hover:bg-slate-500/50 hover:shadow-lg text-xl'><IoMdCloseCircleOutline /></span>
                </div>)
              }
              <label htmlFor="image" className='flex flex-col justify-center items-center h-[190px] border border-dashed cursor-pointer hover:border-red-500 w-full text-[#d0d2d6]'>
                <span><IoMdImages /></span>
                <span>Chọn ảnh</span>
              </label>
              <input onChange={imageHandle} className='hidden' type="file" multiple id='image' />
            </div>
            <div className='flex justify-center md:justify-start '>
              <button disabled={loading} className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-3 my-3 w-[200px] '>
                {
                  loading ? <ClipLoader color='white' size={25} /> : 'Thêm sản phẩm'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div >
  );
};

export default AddProduct;