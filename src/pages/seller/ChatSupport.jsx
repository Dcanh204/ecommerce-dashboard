import React from 'react';
const ChatSupport = () => {
  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md h-[calc(100vh-140px)]'>
        <div className='w-full h-full relative flex'>
          <div className='w-full'>
            <div className='flex justify-between items-center'>
              <div className='flex justify-start items-center gap-3'>
                <div className='relative'>
                  <img className='h-[38px] w-[38px] rounded-full border-2 p-[2px] border-green-300' src="/images/admin.jpg" alt="seller" />
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full bottom-0 right-0 absolute'></div>
                </div>
                <div className='flex flex-col'>
                  <h2 className='text-sm font-medium text-white'>Admin</h2>
                </div>
              </div>

            </div>

            <div className='py-4'>
              <div className='bg-[#475569] h-[calc(100vh-290px)] rounded-lg p-2 overflow-y-auto'>
                <div className='w-full flex justify-end items-center'>
                  <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 text-white px-3 py-1 rounded-lg'>
                      <span className='text-sm'>Bạn có rảnh không? Cho tôi hỏi cái này.</span>
                    </div>
                    <img className='w-[38px] h-38[px] rounded-full border-2 border-white p-[3px] max-w-[38px]' src="/images/admin.jpg" alt="demo" />
                  </div>
                </div>

                <div className='w-full flex justify-start items-center'>
                  <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <img className='w-[38px] h-38[px] rounded-full border-2 border-white p-[3px] max-w-[38px]' src="/images/admin.jpg" alt="demo" />
                    <div className='flex justify-center items-start flex-col w-full bg-slate-200 text-black px-3 py-1 rounded-lg'>
                      <span className='text-sm'>Tôi có, bạn hỏi đi </span>
                    </div>

                  </div>
                </div>

                <div className='w-full flex justify-end items-center'>
                  <div className='flex justify-start items-center gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]'>
                    <div className='flex justify-center items-start flex-col w-full bg-blue-500 text-white px-3 py-1 rounded-lg break-words'>
                      <span className='text-sm'>Có thể cho tôi xin nghỉ ngày mai không? </span>
                    </div>
                    <img className='w-[38px] h-38[px] rounded-full border-2 border-white p-[3px] max-w-[38px]' src="/images/admin.jpg" alt="demo" />
                  </div>
                </div>
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

export default ChatSupport;