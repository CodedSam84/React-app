import Image from "next/image";
import { 
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon
}
from '@heroicons/react/solid'
import { useState } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Router, useRouter } from "next/router";

function Header({placeholder}) {
  
  const [searchInput, setSearchInput] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [noOfGuests, setNoOfGuests] = useState(1);

  const router = useRouter();
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests
      },
    })
    console.log(router.query.startDate);
  }

  

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  }

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const resetSearch = () => setSearchInput("")
  
  return (

    <header className="sticky top-0 z-50 grid grid-cols-3 lg:grid-cols-3 bg-white shadow-md p-5 md: px-10">
      
      {/* Left */}
      <div onClick={() => router.push("/") }
        className="hidden relative lg:flex items-center h-10 cursor-pointer my-auto "
      >
        <Image 
          src="https://links.papareact.com/qd3" 
          layout="fill"
          objectFit="contain"
          objectPosition="left"
          alt=""
        />
      </div>
      {/* Middle - Search*/}
      <div className="flex items-center col-span-3 lg:col-span-1 border-2 rounded-full px-2 py-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-2 w-[150px] flex-grow bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your search"}
        />

        <SearchIcon className="h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer lg:inline-flex "/>
        
      </div>
      {/* Right */}
      <div className="hidden lg:flex space-x-4 items-center justify-end text-gray-500">
        <p className="hidden md:inline cursor-pointer sm:text-sm lg:text-base">Become a host</p>
        <GlobeAltIcon className="hidden sm:h-6"/>
        <div className="hidden sm:flex sm:items-center sm:space-x-2 sm:border-2 sm:p-2 sm:rounded-full">
          <MenuIcon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>

      {searchInput && (
        <div className="flex-col col-span-3 mx-auto mt-10">
          <DateRangePicker
            dateFormat="MM-DD-YYYY"
            ranges={[selectionRange]}
            onChange={handleSelect}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
          />

          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
            <UsersIcon className="h-5"/>
            <input onChange={(e) => setNoOfGuests(e.target.value)} type="number" value={noOfGuests} className="w-12 pl-2 text-lg outline-none text-red-400" min="1"/>
          </div>

          <div className="flex">
            <button className="grow text-gray-500" onClick={resetSearch}>Cancel</button>
            <button onClick={search} className="grow text-red-400">Search</button>
          </div>
        </div>
      )}

    </header>
  )
}

export default Header
