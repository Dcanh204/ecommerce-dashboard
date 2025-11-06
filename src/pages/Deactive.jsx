import React from 'react';
import { Link } from 'react-router-dom';

const Deactive = () => {
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen bg-white px-5">
        <div className="flex justify-center items-center mb-8 lg:mb-0 lg:mr-10">
          <img
            src="/images/deactive.png"
            alt="deactive"
            className="w-[400px] lg:w-[500px] h-auto object-contain"
          />
        </div>
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl font-semibold text-[#2b3544] mb-4">
            Tài khoản của bạn đã bị vô hiệu hóa!
          </h1>
          <p className="text-[#2b3544] text-lg mb-8">
            Rất tiếc, tài khoản của bạn hiện đang bị tạm khóa.
            Vui lòng liên hệ bộ phận hỗ trợ để biết thêm chi tiết hoặc kích hoạt lại tài khoản.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <Link
              to="/"
              className="bg-[#ffce00] hover:bg-[#f5c400] text-black font-semibold py-3 px-6 rounded-full transition duration-200"
            >
              Về trang chủ
            </Link>
            <Link
              to="/seller/dashboard/chat-support"
              className="border border-[#ffce00] text-[#2b3544] font-semibold py-3 px-6 rounded-full hover:bg-[#fff6cc] transition duration-200"
            >
              Liên hệ hỗ trợ
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Deactive;
