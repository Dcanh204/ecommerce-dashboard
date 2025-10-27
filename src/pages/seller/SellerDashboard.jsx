import React from 'react';
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';

const SellerDashboard = () => {
  const state = {
    series: [
      {
        name: 'Đơn hàng',
        data: [23, 34, 45, 67, 76, 34, 45, 76, 87, 78, 65, 89]
      },
      {
        name: 'Thu nhập (Triệu đồng)',
        data: [67, 39, 45, 85, 90, 56, 76, 56, 78, 87, 53, 109]
      },
      {
        name: 'Sản phẩm bán ra',
        data: [34, 39, 56, 56, 80, 67, 23, 56, 89, 70, 45, 54]
      }
    ],
    options: {
      chart: {
        background: 'transparent',
        foreColor: '#d0d2d6',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        curve: ['smooth', 'straight', 'stepline'],
        lineCap: 'butt',
        colors: '#f0f0f0',
        width: 1,
        dashArray: 0
      },
      xaxis: {
        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      },
      legend: {
        position: 'top'
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            yaxis: {
              categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            },
            plotOptions: {
              bar: {
                horizontal: true
              },
            },
            chart: {
              height: 500
            }
          }
        }
      ]
    }
  }


  return (
    <div className='px-5 md:px-7 py-5'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7'>
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
            <h2 className='text-3xl font-bold'>50</h2>
            <span className='text-base font-medium'>Sản phẩm</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#760077] text-xl'>
            <span><MdProductionQuantityLimits className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>

        <div className='flex justify-between items-center bg-[#e9feea] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>60</h2>
            <span className='text-base font-medium'>Đơn hàng</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#038000] text-xl'>
            <span><FaCartArrowDown className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>

        <div className='flex justify-between items-center bg-[#ecebff] p-5 rounded-md gap-3'>
          <div className='flex flex-col justify-start items-start text-[#5c5a5a]'>
            <h2 className='text-3xl font-bold'>54</h2>
            <span className='text-base font-medium'>Đơn hàng chờ xử lý</span>
          </div>
          <div className='w-[40px] h-[47px] flex justify-center items-center rounded-full bg-[#0020f8] text-xl'>
            <span><FaCartArrowDown className='text-[#fae8e8] shadow-lg' /></span>
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap mt-7'>
        <div className='w-full lg:w-7/12 lg:pr-3'>
          <div className="w-full bg-[#6a5fdf] p-4 rounded-md">
            <Chart options={state.options} series={state.series} type="bar" height="350" />
          </div>
        </div>

        <div className='w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0'>
          <div className='w-full bg-[#6a5fdf] p-4 rounded-md'>
            <div className='flex justify-between items-center text-[#d0d2d6]'>
              <h2 className='font-semibold text-lg'>Tin nhắn gần đây</h2>
              <Link className='font-semibold text-sm'>Xem tất cả</Link>
            </div>

            <div className='flex flex-col gap-2 pt-6 text-[#d0d2d6]'>
              <ol className='relative ml-4'>
                <li className='mb-3 ml-6'>
                  <div className='flex absolute -left-5 justify-center items-center w-10 h-10 shadow-lg bg-[#4c7fe2] rounded-full p-[6px] z-10'>
                    <img className='w-full h-full' src="/images/seller.png" alt="seller" />
                  </div>
                  <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                    <div className='flex justify-between items-center mb-2'>
                      <Link>Người bán</Link>
                      <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>2 ngày trước</time>
                    </div>
                    <div className='p-2 bg-slate-700 border border-slate-800 rounded-lg text-sm font-normal'>
                      Bạn có khỏe không?
                    </div>
                  </div>
                </li>
                <li className='mb-3 ml-6'>
                  <div className='flex absolute -left-5 justify-center items-center w-10 h-10 shadow-lg bg-[#4c7fe2] rounded-full p-[6px] z-10'>
                    <img className='w-full h-full' src="/images/seller.png" alt="seller" />
                  </div>
                  <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                    <div className='flex justify-between items-center mb-2'>
                      <Link>Khách hàng</Link>
                      <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>4 ngày trước</time>
                    </div>
                    <div className='p-2 bg-slate-700 border border-slate-800 rounded-lg text-sm font-normal'>
                      Sản phẩm này bị lỗi
                    </div>
                  </div>
                </li>
                <li className='ml-6'>
                  <div className='flex absolute -left-5 justify-center items-center w-10 h-10 shadow-lg bg-[#4c7fe2] rounded-full p-[6px] z-10'>
                    <img className='w-full h-full' src="/images/seller.png" alt="seller" />
                  </div>
                  <div className='p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm'>
                    <div className='flex justify-between items-center mb-2'>
                      <Link>Người bán</Link>
                      <time className='mb-1 text-sm font-normal sm:order-last sm:mb-0'>4 ngày trước</time>
                    </div>
                    <div className='p-2 bg-slate-700 border border-slate-800 rounded-lg text-sm font-normal'>
                      Thứ sáu em xin nghỉ được không ạ?
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full p-4 bg-[#6a5fdf] rounded-md mt-6'>
        <div className='flex justify-between items-center  text-[#d0d2d6] pb-2'>
          <h2 className='font-semibold text-lg'>Đơn hàng gần đây</h2>
          <Link className='font-semibold text-sm'>Xem tất cả</Link>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full text-sm text-left text-[#d0d2d6]'>
            <thead className='uppercase border-b border-slate-700'>
              <tr>
                <th scope='col' className='py-3 px-4'>Mã đơn hàng</th>
                <th scope='col' className='py-3 px-4'>Giá</th>
                <th scope='col' className='py-3 px-4'>Trạng thái thanh toán</th>
                <th scope='col' className='py-3 px-4'>Trạng thái đơn hàng</th>
                <th scope='col' className='py-3 px-4'>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item, index) =>
                <tr key={index}>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>MDH-001</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>2.000.000</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  <td scope='row' className='py-3 px-4 font-medium whitespace-nowrap'>Chờ xử lý</td>
                  <td scope='row' className='py-3 px-4 lg:px-8 font-medium whitespace-nowrap'>
                    <Link>Xem</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;