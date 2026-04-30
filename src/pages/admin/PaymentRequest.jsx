import React, { forwardRef } from 'react';
import { List } from 'react-window';


const PaymentRequest = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Row = ({ index, style }) => {
    return (
      <div style={style} className='flex text-xs text-white font-medium'>
        <div className='w-[20%] p-2 whitespace-nowrap '>{index + 1}</div>
        <div className='w-[20%] p-2 whitespace-nowrap '>1.000.000đ</div>
        <div className='w-[20%] p-2 whitespace-nowrap '>
          <span className='py-[1px] px-[5px] bg-slate-600 text-blue-500 rounded-md text-xs'>Chờ xác nhận</span>
        </div>
        <div className='w-[20%] p-2 whitespace-nowrap '>18-10-2025</div>
        <div className='w-[20%] p-2 whitespace-nowrap '>
          <button className='bg-orange-500 shadow-lg hover:shadow-orange-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-xs'>Xác nhận</button>
        </div>
      </div>
    )
  }
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full p-4 rounded-md bg-[#6a5fdf]'>
        <h2 className='text-xl font-medium pb-5 text-[#d0d2d6]'>Yêu cầu rút tiền</h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className='min-w-[700px]'>
              <div className='flex items-center bg-[#a7a3de] uppercase text-xs min-w-[340px] rounded-md font-bold'>
                <div className='w-[20%] p-2'>STT</div>
                <div className='w-[20%] p-2'>Số tiền</div>
                <div className='w-[20%] p-2'>Trạng thái</div>
                <div className='w-[20%] p-2'>Ngày yêu cầu</div>
                <div className='w-[20%] p-2'>Hành động</div>
              </div>
              {
                <List
                  rowComponent={Row}
                  rowCount={array.length}
                  rowHeight={35}
                  rowProps={{}}
                  style={{ minWidth: "340px", maxHeight: 350 }}
                />
              }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;