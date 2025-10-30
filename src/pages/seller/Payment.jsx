import React from 'react';
import { MdCurrencyExchange } from "react-icons/md";
import { List } from 'react-window';
const Payment = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Row = ({ index, style }) => {
    return (
      <div style={style} className='flex text-sm text-white font-medium'>
        <div className='w-[25%] p-2 whitespace-nowrap '>{index + 1}</div>
        <div className='w-[25%] p-2 whitespace-nowrap '>1.000.000đ</div>
        <div className='w-[25%] p-2 whitespace-nowrap '>
          <span className='py-[1px] px-[5px] bg-slate-600 text-blue-500 rounded-md text-sm'>Chờ xác nhận</span>
        </div>
        <div className='w-[25%] p-2 whitespace-nowrap '>18-10-2025</div>
      </div>
    )
  }
  return (
    <div className='px-2 lg:px-7 pt-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7 mb-5'>
        <div className='flex justify-between items-center bg-[#fae8e8] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>45.000.000đ</h2>
            <span className='text-base font-medium'>Tổng doanh thu</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#fa0308] text-xl'>
            <span><MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>

        <div className='flex justify-between items-center bg-[#fde2ff] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>23.000.000đ</h2>
            <span className='text-base font-medium'>Số tiền hiện có</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#760077] text-xl'>
            <span><MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>

        <div className='flex justify-between items-center bg-[#e9feea] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>11.000.000đ</h2>
            <span className='text-base font-medium'>Số tiền đã rút</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#038000] text-xl'>
            <span><MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>

        <div className='flex justify-between items-center bg-[#ecebff] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>0</h2>
            <span className='text-base font-medium'>Số tiền đang chờ xử lý</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#0020f8] text-xl'>
            <span><MdCurrencyExchange className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-2 '>
        <div className='w-full text-[#d0d2d6] bg-[#6a5fdf] rounded-md p-5'>
          <h2 className='text-lg font-medium'>Gửi yêu cầu rút tiền</h2>
          <div className='pt-5 mb-5'>
            <form>
              <div className='flex gap-4'>
                <input type="number" min={0} className='w-[75%] px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' placeholder='Nhập số tiền' name='amount' />
                <button className='bg-red-500 shadow-red-500/50 hover:shadow-lg rounded-lg text-white px-7 py-2'>Gửi</button>
              </div>
            </form>
          </div>

          <div>
            <h2 className='text-lg pb-4 font-medium'>Yêu cầu đang chờ duyệt</h2>
            <div className="w-full overflow-x-auto">
              <div className='min-w-[500px]'>
                <div className='flex items-center bg-[#a7a3de] uppercase text-sm min-w-[340px] rounded-md font-bold'>
                  <div className='w-[25%] p-2'>STT</div>
                  <div className='w-[25%] p-2'>Số tiền</div>
                  <div className='w-[25%] p-2'>Trạng thái</div>
                  <div className='w-[25%] p-2'>Ngày yêu cầu</div>
                </div>
                {
                  <List
                    rowComponent={Row}
                    rowCount={array.length}
                    rowHeight={40}
                    rowProps={{}}
                    style={{ minWidth: "340px", maxHeight: "400px" }}
                  />
                }
              </div>

            </div>
          </div>
        </div>

        <div className='w-full text-[#d0d2d6] bg-[#6a5fdf] rounded-md p-5'>
          <div>
            <h2 className='text-lg pb-4 font-medium'>Rút tiền thành công</h2>
            <div className="w-full overflow-x-auto">
              <div className='min-w-[500px]'>
                <div className='flex items-center bg-[#a7a3de] uppercase text-sm min-w-[340px] rounded-md font-bold'>
                  <div className='w-[25%] p-2'>STT</div>
                  <div className='w-[25%] p-2'>Số tiền</div>
                  <div className='w-[25%] p-2'>Trạng thái</div>
                  <div className='w-[25%] p-2'>Ngày yêu cầu</div>
                </div>
                {
                  <List
                    rowComponent={Row}
                    rowCount={array.length}
                    rowHeight={40}
                    rowProps={{}}
                    style={{ minWidth: "340px", maxHeight: "400px" }}
                  />
                }
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;