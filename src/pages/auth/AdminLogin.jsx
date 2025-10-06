
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { admin_login, messageClear } from '../../stores/Reducers/authReducer';
import { ClipLoader } from 'react-spinners'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const AdminLogin = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { loading, errorMessage, successMessage } = useSelector(state => state.auth);
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
    dispatch(admin_login(state))
  }

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      navigation('/');
    }
  }, [errorMessage, successMessage, dispatch, navigation])
  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex justify-center items-center'>
      <div className="w-[350px] text-[#ffffff] p-2">
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <div className='h-[70px] flex justify-center items-center'>
            <div className='w-[180px] h-[50px]'>
              <img className='w-full h-full' src="/images/logo.png" alt="logo" />
            </div>
          </div>
          <form onSubmit={submitHandle}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input onChange={inputHandle} value={state.email} className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md" type="email" name="email" id="email" placeholder="Email" required />
            </div>

            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input onChange={inputHandle} value={state.password} className="px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md" type="password" name="password" id="password" placeholder="Password" required />
            </div>

            <button disabled={loading} className="bg-slate-800 w-full hover:shadow-blue-300 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3 cursor-pointer">
              {loading ? <ClipLoader color='white' /> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default AdminLogin;