import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Điện thoại"
    },
    {
      id: 2,
      name: "Máy tính"
    },
    {
      id: 3,
      name: 'Đồng hồ'
    },
    {
      id: 4,
      name: 'Tivi'
    },

  ]
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
  console.log(state)
  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex justify-between items-center pb-4'>
          <h2 className='font-semibold text-[#d0d2d6] text-xl'>Thêm sản phẩm</h2>
          <Link className='bg-blue-500 shadow-blue-500/50 hover:shadow-lg rounded-md text-white px-7 py-2'>Tất cả sản phẩm</Link>
        </div>

        <div>
          <form>
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
                      allCategory.map((item, index) => <span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white w-full cursor-pointer`} onClick={() => {
                        setCateShow(false)
                        setCategory(item.name)
                        setSearchValue('')
                        setAllCategory(categories)
                      }}>
                        {item.name}
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

            <div className='flex flex-col w-full gap-1 text-[#d0d2d6]'>
              <label htmlFor="description">Mô tả</label>
              <textarea onChange={inputHandle} value={state.description} className='px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="type" name='description' id='description' placeholder='Nhập mô tả' cols={10} rows={4} />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;