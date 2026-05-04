import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_customer_messages, get_customers } from './../../stores/reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai';
const ChatCustomers = () => {
  const [show, setShow] = useState(true);
  const sellerId = 65;
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { customers, messages, currentCustomer } = useSelector(state => state.chat);

  const { customerId } = useParams();

  useEffect(() => {
    dispatch(get_customers(userInfo._id))
  }, [userInfo, dispatch])

  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_messages(customerId))
    }

  }, [customerId, dispatch])

  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md h-[calc(100vh-140px)]'>
        <div className='w-full h-full relative flex'>
          <div className={`w-[280px] absolute h-full z-10 ${show ? 'left-0' : '-left-[336px]'} md:left-0 md:relative transition-all`}>
            <div className='w-full h-[calc(100vh-177px)] bg-[#9e97e9] md:bg-transparent overflow-y-auto'>
              <div className='flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white'>
                <h2 className='text-lg text-center'>Khách hàng</h2>
                <span onClick={() => setShow(false)} className='block cursor-pointer md:hidden'>
                  <IoMdClose />
                </span>
              </div>

              {
                customers.map((c) => (
                  <Link to={`/seller/dashboard/chat-customer/${c.fdId}`} key={c.fdId} className={`h-[60px] flex justify-start items-center gap-2 text-white p-2 rounded-md cursor-point bg-[#8288ed]`}>
                    <div className='relative'>
                      <img className='h-[35px] w-[35px] rounded-full border-2 p-[2px] border-white' src="/images/admin.jpg" alt="seller" />
                      <div className='w-[10px] h-[10px] bg-green-500 rounded-full bottom-0 right-0 absolute'></div>
                    </div>

                    <div className='flex flex-col'>
                      <h2 className='text-sm font-semibold'>{c.name}</h2>
                    </div>
                  </Link>
                ))
              }


            </div>
          </div>

          <div className='w-full md:w-[calc(100%-280px)] md:pl-4'>
            <div className='flex justify-between items-center'>
              {
                sellerId && <div className='flex justify-start items-center gap-3'>
                  <div className='relative'>
                    <img className='h-[38px] w-[38px] rounded-full border-2 p-[2px] border-green-300' src="/images/admin.jpg" alt="seller" />
                    <div className='w-[10px] h-[10px] bg-green-500 rounded-full bottom-0 right-0 absolute'></div>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='text-sm font-medium text-white'>Đình Cảnh</h2>
                  </div>
                </div>
              }

              <div onClick={() => setShow(!show)} className='w-[35px] h-[35px] flex md:hidden rounded-md bg-blue-500 shadow-blue-500/80 hover:shadow-lg justify-center items-center cursor-pointer text-white'>
                <span><FaList /></span>
              </div>
            </div>

            <div className='py-4'>
              <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-lg p-2 overflow-y-auto'>
                {
                  customerId ? messages.map((m, i) => {
                    if (m.senderId === customerId) {
                      return (
                        <div key={i} className='w-full flex justify-start items-center'>
                          <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <img className='w-[30px] h-[30px] rounded-full border-2 border-white p-[3px] max-w-[38px]' src="/images/admin.jpg" alt="demo" />
                            <div className='flex justify-center items-start flex-col w-full bg-slate-200 text-black px-3 py-1 rounded-lg'>
                              <span className='text-sm'>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='w-full flex justify-end items-center'>
                          <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                            <div className='flex justify-center items-start flex-col w-full bg-blue-500 text-white px-3 py-1 rounded-lg'>
                              <span className='text-sm'>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                    : <div className='w-full h-full flex flex-col justify-center items-center text-slate-600 gap-4'>
                      <div className='w-20 h-20 flex items-center justify-center rounded-full bg-slate-100 shadow-inner'>
                        <AiOutlineMessage className='text-4xl text-slate-400' />
                      </div>
                      <h2 className='text-xl font-semibold text-white'>
                        Chưa có cuộc trò chuyện
                      </h2>
                      <p className='text-sm text-slate-400 text-center max-w-[300px]'>
                        Hãy chọn khách hàng ở bên trái để bắt đầu nhắn tin và nhận hỗ trợ nhanh chóng.
                      </p>

                    </div>
                }
              </div>
            </div>

            <form className='flex gap-3' >
              <input className='w-full border border-slate-600 px-3 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]' type="text" placeholder='Aa' />
              <button className='w-[75px] h-[35px] bg-[#06b6d4]  shadow-cyan-500/50 hover:shadow-lg font-semibold rounded-md text-white'>Gửi</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatCustomers;