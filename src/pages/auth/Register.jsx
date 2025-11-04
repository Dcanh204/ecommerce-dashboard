import { Link, useNavigate } from 'react-router-dom'
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageClear, seller_register } from '../../stores/Reducers/authReducer';
import { ClipLoader } from 'react-spinners';
import toast from 'react-hot-toast';
const Register = () => {

  const { loading, errorMessage, successMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigation = useNavigate()
  const [state, setState] = useState({
    name: "",
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
    dispatch(seller_register(state));
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear())
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigation("/");
    }
  }, [errorMessage, successMessage, dispatch, navigation])

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <h2 className="text-xl mb-3 font-bold">Welcome to Ecommerce</h2>
          <p className="text-sm mb-3 font-medium">Please register your account</p>
          <form onSubmit={submitHandle}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Name</label>
              <input onChange={inputHandle} value={state.name} className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md" type="text" name="name" placeholder="Name" id="name" required />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input onChange={inputHandle} value={state.email} className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md" type="email" name="email" id="email" placeholder="Email" required />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input onChange={inputHandle} value={state.password} className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md" type="password" name="password" id="password" placeholder="Password" required />
            </div>

            <div className="flex items-center gap-3 w-full mb-3">
              <input className="w-4 h-4 text-blue-500 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500" type="checkbox" name="checkbox" id="checkbox" />
              <label htmlFor="checkbox">I agree to privacy policy & treams</label>
            </div>

            <button disabled={loading} className="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
              {
                loading ? <ClipLoader color='white' /> : 'Sing Up'
              }
            </button>
            <div className="flex justify-center items-center mb-3 gap-3">
              <p>
                Already Have an account ? <Link className="font-bold" to="/login">Sing In</Link>
              </p>
            </div>
            <div className=' w-full flex justify-center items-center mb-3'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center '>
                <span className='pb-1'>Or</span>
              </div>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
            </div>
            <div className='flex justify-center items-center gap-3'>
              <button className='w-[135px] h-[35px] flex justify-center items-center bg-orange-700 rounded-md cursor-pointer hover:shadow-orange-700/50 shadow-lg overflow-hidden'>
                <FaGoogle />
              </button>
              <button className='w-[135px] h-[35px] flex justify-center items-center bg-blue-700 rounded-md cursor-pointer hover:shadow-blue-700/50 shadow-lg overflow-hidden'>
                <FaFacebook />
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default Register;