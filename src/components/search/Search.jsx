import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import SearchVideo from './SearchVideos';
import { useSelector } from 'react-redux';
import { getHoverState } from '../../redux/cssChangedOn.slice';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // State to pass to SearchVideo
  let hoverState = useSelector(getHoverState);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      setSearchQuery(query); // ✅ Updates search query state
    }
  };

  return (
    <div 
      className={`min-h-screen w-full mb-[150px] md:mb-0 px-0 flex flex-col gap-4 
      ${hoverState ? "md:pl-48" : "md:pl-24"} md:duration-300 md:ease-in-out py-10`}
    >
      <form 
        className="w-[60%] mx-auto border border-gray-300 rounded-full overflow-hidden bg-white flex justify-center items-center" 
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-4 py-2 outline-none text-gray-700"
        />
        <button 
          type="submit" 
          className="p-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600 transition"
        >
          <BsSearch className="w-5 h-5" />
        </button>
      </form>
      
      {/* ✅ Pass searchQuery state to SearchVideo */}
      {searchQuery && <SearchVideo query={searchQuery} />}
    </div>
  );
};

export default Search;
