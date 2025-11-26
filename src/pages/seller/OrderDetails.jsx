import React from 'react';

const OrderDetails = () => {
  return (
    <div className='px-2 lg:px-7 py-5'>
      <div className='w-full p-4 bg-[#6a5fdf] rounded-md'>
        <div className='flex flex-wrap'>
          <div className='w-full xl:w-[30%]'>
            <div className='p-5 border border-slate-200 rounded-md shadow-md'>
              <h2 className='font-medium  text-xl text-[#d0d2d6]'>Chi tiết đơn hàng</h2>
              <div className="text-sm mt-2 text-[#d0d2d6] flex-col gap-2">
                <div className="flex justify-between">
                  <span className="font-medium">#343434</span>
                  <span>27-09-2025</span>
                </div>

                <div className='flex justify-between p-1'>
                  <span className="font-medium">Người nhận: </span>
                  <span>Nguyễn Đình Cảnh</span>
                </div>

                <div className='flex justify-between p-1'>
                  <span className="font-medium whitespace-nowrap">Địa chỉ: </span>
                  <span> Hòa Tiến, Yên Phong, Bắc Ninh</span>
                </div>

                <div className="flex justify-between p-1">
                  <span className="font-medium">Trạng thái:</span>
                  <span> Đã thanh toán </span>
                </div>

                <div className='flex justify-between p-1'>
                  <span className="font-medium">Tổng tiền: </span>
                  <span className="font-semibold">2.000.000đ</span>
                </div>
              </div>
              <div className='h-[2px] bg-white my-5'></div>

              <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-lg py-2 px-3 justify-center'>
                <div className='flex gap-3 items-center'>
                  <img className='w-[50px] h-[50px]' src="/images/category/1.jpg" alt="" />
                  <div className='w-full flex justify-between items-center text-[#d0d2d6]'>
                    <div className='flex flex-col gap-1'>
                      <h2>Giày thể thao</h2>
                      <span>Adidas</span>
                    </div>
                    <div className='flex items-center'>
                      <span>3</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-lg py-2 px-3 justify-center'>
                <div className='flex gap-3 items-center'>
                  <img className='w-[50px] h-[50px]' src="/images/category/1.jpg" alt="" />
                  <div className='w-full flex justify-between items-center text-[#d0d2d6]'>
                    <div className='flex flex-col gap-1'>
                      <h2>Giày thể thao</h2>
                      <span>Adidas</span>
                    </div>
                    <div className='flex items-center'>
                      <span>3</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className='mt-4 flex flex-col gap-4 bg-[#8288ed] rounded-lg py-2 px-3 justify-center'>
                <div className='flex gap-3 items-center'>
                  <img className='w-[50px] h-[50px]' src="/images/category/1.jpg" alt="" />
                  <div className='w-full flex justify-between items-center text-[#d0d2d6]'>
                    <div className='flex flex-col gap-1'>
                      <h2>Giày thể thao</h2>
                      <span>Adidas</span>
                    </div>
                    <div className='flex items-center'>
                      <span>3</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className='w-full xl:w-[70%]'>
            <div className='pl-0 xl:pl-3 mt-3 lg:mt-0'>
              <div className='p-5 border border-slate-200 rounded-md shadow-md'>
                <div className='flex justify-between items-center'>
                  <h2 className='font-medium  text-xl text-[#d0d2d6]'>Đơn hàng theo người bán</h2>
                  <select className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#475569] border border-slate-700 rounded-md text-[#d0d2d6]'>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang xử lý">Chờ xác nhận</option>
                    <option value="Đang xử lý">Trong kho</option>
                    <option value="Đang xử lý">Đã đặt hàng</option>
                    <option value="Đang xử lý">Đã hủy</option>
                  </select>
                </div>
                <div className='overflow-x-auto overflow-y-auto'>
                  <table className='w-full text-left bg-[#8288ed] rounded-md mt-3 text-xs'>
                    <thead>
                      <tr className='border-b border-slate-700'>
                        <th className='px-4 py-2 whitespace-nowrap'>Ảnh</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Tên sản phẩm</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Thương hiệu</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Số lượng</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Người bán</th>
                        <th className='px-4 py-2 whitespace-nowrap'>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3].map((item, index) =>
                        <tr key={index} className='border-b border-slate-500'>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>
                            <img className='w-[50px] h-[50px]' src={`/images/category/${item}.jpg`} alt="category" />
                          </td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Giày thể thao</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Adidas</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>3</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Đình Cảnh</td>
                          <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chờ xác nhận</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;