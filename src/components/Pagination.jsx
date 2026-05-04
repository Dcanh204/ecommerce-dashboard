import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
  const totalPage = Math.ceil(totalItem / parPage);

  let startPage = Math.max(1, pageNumber - Math.floor(showItem / 2));
  let endPage = startPage + showItem - 1;

  if (endPage > totalPage) {
    endPage = totalPage;
    startPage = Math.max(1, endPage - showItem + 1);
  }

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li key={i} onClick={() => setPageNumber(i)} className={`${pageNumber === i ? 'bg-indigo-300 shadow-lg shadow-indigo-300/50 text-white' : 'bg-slate-600 hover:bg-indigo-400 shadow-lg hover:shadow-indigo-500/50 hover:text-white text-[#d0d2d6]'} w-[25px] h-[25px] rounded-full flex justify-center items-center cursor-pointer text-xs`}>
          {i}
        </li>
      )
    }
    return btns;
  }

  return (
    <ul className='flex gap-3'>
      {
        pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='w-[25px] h-[25px] rounded-full flex justify-center items-center bg-slate-300 text-[#010307] cursor-pointer text-xs'>
          <MdKeyboardDoubleArrowLeft />
        </li>
      }
      {
        createBtn()
      }
      {
        pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='w-[25px] h-[25px] rounded-full flex justify-center items-center bg-slate-300 text-[#010307] cursor-pointer text-xs'>
          <MdKeyboardDoubleArrowRight />
        </li>
      }
    </ul>
  );
};

export default Pagination;