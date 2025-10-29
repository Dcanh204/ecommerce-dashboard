import React from 'react';

const Search = ({ setParPage, setSearchValue, searchValue }) => {
  return (
    <div className='flex justify-between items-center mb-5'>
      <select onChange={(e) => setParPage(parseInt(e.target.value))} className='px-3 py-2 border border-slate-700 outline-none rounded-md hover:border-indigo-400 text-[#d0d2d6] bg-[#6a5fdf]'>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} className='w-[250px] px-3 py-2 border border-slate-700 rounded-md outline-none focus:border-indigo-400 bg-transparent' type="text" name='search' placeholder='Tìm kiếm' />
    </div>
  );
};

export default Search;