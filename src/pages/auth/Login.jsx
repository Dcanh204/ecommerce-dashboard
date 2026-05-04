import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { messageClear, seller_login } from '../../stores/Reducers/authReducer';

const Login = () => {

  const { loading, errorMessage, successMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: ""
  })

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }

  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(seller_login(state))
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear())
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear())
      navigation('/')
    }
  }, [errorMessage, successMessage, dispatch, navigation])

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className='bg-[#6f68d1] p-4 rounded-md'>

          <h2 className="text-lg text-center mb-3 font-bold">Chào mừng đến với Easy Shop</h2>
          <p className="text-xs text-center mb-3 font-medium">Vui lòng đăng nhập vào tài khoản của bạn</p>

          <form onSubmit={submitHandle}>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email" className='text-sm'>Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md text-xs"
                type="email"
                name="email"
                id="email"
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password" className='text-sm'>Mật khẩu</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md text-xs"
                type="password"
                name="password"
                id="password"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <button
              disabled={loading}
              className="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 cursor-pointer text-sm"
            >
              {
                loading ? <ClipLoader color='white' /> : 'Đăng nhập'
              }
            </button>

            <div className="flex justify-center items-center mb-3 gap-3">
              <p className='text-xs'>
                Chưa có tài khoản?
                <Link className="font-bold ml-1" to="/register" className="text-sm">Đăng ký</Link>
              </p>
            </div>

            <div className=' w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center '>
                <span className='pb-1' className="text-xs">Hoặc</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
            </div>

            <div className='flex justify-center items-center gap-3'>
              <button
                type='button'
                className='w-[135px] h-[35px] flex justify-center items-center bg-orange-700 rounded-md cursor-pointer hover:shadow-orange-700/50 shadow-lg overflow-hidden'
              >
                <FaGoogle />
              </button>

              <button
                type="button"
                className='w-[135px] h-[35px] flex justify-center items-center bg-blue-700 rounded-md cursor-pointer hover:shadow-blue-700/50 shadow-lg overflow-hidden'
              >
                <FaFacebook />
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;