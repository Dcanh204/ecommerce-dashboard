import React from 'react';
import { Link } from 'react-router-dom';

const Pending = () => {
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className="flex flex-col lg:flex-row justify-center items-center h-screen bg-white px-5">
        <div className="flex justify-center items-center mb-8 lg:mb-0 lg:mr-10">
          <img
            src="/images/pending.png"
            alt="pending"
            className="w-[400px] lg:w-[500px] h-auto object-contain"
          />
        </div>

        {/* Nội dung văn bản */}
        <div className="text-center lg:text-left max-w-lg">
          <h1 className="text-4xl font-semibold text-[#2b3544] mb-4">
            Yêu cầu của bạn đang được xử lý!
          </h1>
          <p className="text-[#2b3544] text-lg mb-8">
            Xin vui lòng chờ trong giây lát, chúng tôi đang kiểm tra và xác nhận thông tin của bạn.
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
            <Link
              to="/"
              className="bg-[#ffce00] hover:bg-[#f5c400] text-black font-semibold py-3 px-6 rounded-full transition duration-200"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Pending;
