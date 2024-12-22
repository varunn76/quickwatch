/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import MobleNav from './MobleNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import SearchResult from './SearchResult';
import { dummyData } from '@/utils';

const NavBar = () => {
  const pathname = usePathname();
  const [searchBarShow, setSearchBarShow] = useState(false);

  const NAVLINKS = [
    { label: 'Home', href: '/home' },
    { label: 'Movies', href: '/movies' },
    { label: 'Tv-Series', href: '/tv-series' },
    { label: 'Most Popular', href: '/popular' },
  ];
  // const { isLoading: isSearchLoading, data } = useQuery({
  //   queryKey: ['trending Data', query],
  //   queryFn: async () => {
  //     const response = await fetch(`/api/search?query=${query}`);
  //     const data = await response.json();
  //     return data;
  //   },
  //   staleTime: 5 * 60 * 1000,
  // });

  const SearchBar = ({ isMobile }: { isMobile?: boolean }) => (
    <div
      className={`flex items-center gap-2 ${
        isMobile ? 'lg:hidden' : 'hidden w-2/5 lg:flex xl:w-3/5'
      }`}
    >
      <input
        type='text'
        placeholder='Search for movies or Tv series..'
        className={`w-full rounded-3xl border-0 border-b-2 px-4 py-3 text-sm text-black focus:border-primary focus:outline-none ${isMobile ? '' : 'bg-black-300/20 text-lg font-semibold text-white backdrop-blur-md placeholder:text-white-100'}`}
      />
    </div>
  );

  return (
    <header
      className={`font-work-sans absolute left-0 top-0 z-50 w-full px-5 py-3 shadow-none md:h-[3rem] lg:h-[4.5rem] lg:py-0 ${
        pathname === '/' ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <MobleNav
        setSearchBarShow={setSearchBarShow}
        searchBarShow={searchBarShow}
      />
      <nav className='hidden w-full items-center gap-5 px-10 py-4 lg:flex'>
        <Link href='/' className='w-fit'>
          <img src='/logo.png' alt='logo' className='h-12 w-16' />
        </Link>
        <ul className='flex w-1/2 gap-x-10 2xl:text-[2rem]'>
          {NAVLINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className='font-semibold text-white hover:text-primary-100'
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex w-full items-center justify-around gap-4'>
          {searchBarShow && <SearchBar />}
          <button
            className='ml-auto flex items-center rounded-full p-3 text-white hover:bg-primary/50'
            onClick={() => setSearchBarShow((prev) => !prev)}
          >
            <Search className='size-5' />
          </button>
        </div>
      </nav>
      {searchBarShow && <SearchBar isMobile />}

      <SearchResult resultData={dummyData} />
    </header>
  );
};

export default NavBar;
