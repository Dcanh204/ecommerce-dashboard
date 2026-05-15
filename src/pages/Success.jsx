import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FadeLoader } from 'react-spinners';
import { active_stripe_connect_account, messageClear } from '../stores/reducers/sellerReducer';

const Success = () => {

  const dispatch = useDispatch()

  const { loader, successMessage, errorMessage } = useSelector(state => state.seller)


  const queryParams = new URLSearchParams(window.location.search)
  const activeCode = queryParams.get('activeCode')

  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode))
  }, [activeCode, dispatch])

  const redirect = () => {
    dispatch(messageClear())
    window.location.href = '/seller/dashboard/profile'
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
      {
        loader ? <FadeLoader /> : errorMessage ? <>
          <img src="/images/error.png" alt="error" />
          <button onClick={redirect} className='px-5 py-2 bg-red-600 rounded-sm text-white'>Quay lại trang hồ sơ</button>
        </> : successMessage && <>
          <img src="/images/success.png" alt="success" />
          <button onClick={redirect} className='px-5 py-2 bg-green-700 rounded-sm text-white'>Quay lại trang hồ sơ</button>
        </>
      }


    </div>
  );
};

export default Success;