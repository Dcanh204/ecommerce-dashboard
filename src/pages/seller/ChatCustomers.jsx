import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { get_customer_messages, get_customers, messageClear, send_message, updateMessage } from './../../stores/reducers/chatReducer';
import { Link, useParams } from 'react-router-dom';
import { AiOutlineMessage } from 'react-icons/ai';
import { socket } from './../../utils/socket';
import toast from 'react-hot-toast';
import moment from 'moment';
const ChatCustomers = () => {
  const [show, setShow] = useState(true);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { customers, messages, currentCustomer, successMessage } = useSelector(state => state.chat);
  const messageEndRef = useRef(null);
  const { customerId } = useParams();
  const [receiverMessage, setReceiverMessage] = useState('');
  const [activeCustomer, setActiveCustomer] = useState([])
  useEffect(() => {
    dispatch(get_customers(userInfo._id))
  }, [userInfo, dispatch])
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  useEffect(() => {
    if (customerId) {
      dispatch(get_customer_messages(customerId))
    }

  }, [customerId, dispatch])

  const sendMessage = (e) => {
    e.preventDefault();
    dispatch(send_message({
      senderId: userInfo._id,
      text,
      receiverId: customerId,
      shopName: userInfo?.shopInfo?.shopName
    }))
    setText('')
  }

  useEffect(() => {
    if (successMessage) {
      socket.emit('send_message', messages[messages.length - 1]);
      dispatch(messageClear())
    }
  }, [messages, successMessage, dispatch])

  useEffect(() => {

    socket.on('customer_message', (msg) => {
      setReceiverMessage(msg);
    });

    socket.on('activeCustomer', (customers) => {
      setActiveCustomer(customers);

    });
    return () => {
      socket.off('customer_message');
      socket.off('activeCustomer');
    };
  }, []);
  useEffect(() => {
    if (receiverMessage) {
      if (customerId === receiverMessage.senderId && userInfo._id === receiverMessage.receiverId) {
        dispatch(updateMessage(receiverMessage))
      } else {
        toast.success(receiverMessage.senderName + " " + "Gửi một tin nhắn")
        dispatch(messageClear())
      }

    }
  }, [receiverMessage, dispatch, customerId, userInfo._id])

  const isOnline = activeCustomer.some(
    c => c.customerId === currentCustomer?._id
  );

  useEffect(() => {
    if (!userInfo?._id) return;

    socket.emit('add_seller', userInfo._id, userInfo);

  }, [userInfo]);
  useEffect(() => {
    socket.emit('request_active');
  }, []);
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
                      {
                        activeCustomer.some(ac => ac.customerId === c.fdId) && <div className='w-[10px] h-[10px] bg-green-500 rounded-full bottom-0 right-0 absolute'></div>
                      }

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
                currentCustomer && <div className='flex justify-start items-center gap-3'>
                  <div className='relative'>
                    <img className='h-[38px] w-[38px] rounded-full border-2 p-[2px] border-green-300' src="/images/admin.jpg" alt="seller" />
                    {
                      isOnline && <div className='w-[10px] h-[10px] bg-green-500 rounded-full bottom-0 right-0 absolute'></div>
                    }
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='text-sm font-medium text-white'>{currentCustomer.name}</h2>
                    <p className={`text-[10px] ${isOnline ? 'text-green-500' : 'text-slate-400'}`}>
                      {isOnline ? 'Đang hoạt động' : 'Không hoạt động'}
                    </p>
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
                    const prev = messages[i - 1];
                    // group logic
                    const isFirst =
                      i === 0 || messages[i - 1].senderId !== m.senderId;
                    const isLastInGroup =
                      i === messages.length - 1 ||
                      messages[i + 1].senderId !== m.senderId;

                    const timeDiff =
                      prev
                        ? moment(m.createdAt).diff(moment(prev.createdAt), 'minutes')
                        : 999;

                    const showTime = isLastInGroup || timeDiff >= 10;

                    const showDate =
                      !prev ||
                      !moment(m.createdAt).isSame(prev.createdAt, 'day');

                    return (
                      <div key={i}>

                        {/* DATE */}
                        {showDate && (
                          <div className='w-full flex justify-center my-2'>
                            <span className='text-[10px] text-slate-400 bg-slate-200 px-2 py-1 rounded-full'>
                              {moment(m.createdAt).isSame(moment(), 'day')
                                ? 'Hôm nay'
                                : moment(m.createdAt).format('DD/MM/YYYY')}
                            </span>
                          </div>
                        )}

                        {/* MESSAGE WRAP - GIỮ UI CỦA BẠN */}
                        {m.senderId === customerId ? (
                          <div className='w-full flex justify-start items-center'>

                            <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>

                              {/* AVATAR (CHỈ HIỆN 1 LẦN / GROUP) */}
                              {isFirst ? (
                                <img
                                  className='w-[30px] h-[30px] rounded-full border-2 border-white p-[3px] max-w-[38px]'
                                  src="/images/admin.jpg"
                                  alt="demo"
                                />
                              ) : (
                                <div className='w-[30px]' />
                              )}

                              <div className='flex flex-col'>
                                <div className='flex justify-center items-start flex-col w-full bg-slate-200 text-black px-3 py-1 rounded-lg'>
                                  <span className='text-sm'>{m.message}</span>
                                </div>

                                {/* TIME */}
                                {showTime && (
                                  <span className='text-[10px] text-slate-400 mt-1'>
                                    {moment(m.createdAt).format('HH:mm')}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className='w-full flex justify-end items-center'>

                            <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>

                              <div className='flex flex-col items-end'>
                                <div className='flex justify-center items-start flex-col w-full bg-blue-500 text-white px-3 py-1 rounded-lg'>
                                  <span className='text-sm'>{m.message}</span>
                                </div>

                                {/* TIME */}
                                {showTime && (
                                  <span className='text-[10px] text-slate-300 mt-1'>
                                    {moment(m.createdAt).format('HH:mm')}
                                  </span>
                                )}
                              </div>

                            </div>
                          </div>
                        )}
                      </div>
                    );

                  }) : (
                    <div className='w-full h-full flex flex-col justify-center items-center text-slate-600 gap-4'>
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
                  )
                }
                <div ref={messageEndRef}></div>
              </div>
            </div>

            <form className='flex gap-3' onSubmit={sendMessage} >
              <input value={text} onChange={(e) => setText(e.target.value)} className='w-full border border-slate-600 px-3 py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]' type="text" placeholder='Aa' />
              <button className='w-[75px] h-[35px] bg-[#06b6d4]  shadow-cyan-500/50 hover:shadow-lg font-semibold rounded-md text-white'>Gửi</button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ChatCustomers;