/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useMemo } from 'react';
import MobleNav from './MobleNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';

const NavBar = () => {
  const pathname = usePathname();
  const [searchBarShow, setSearchBarShow] = useState(false);

  const NAVLINKS = [
    { label: 'Home', href: '/home' },
    { label: 'Movies', href: '/movies' },
    { label: 'Tv-Series', href: '/tv-series' },
    { label: 'Most Popular', href: '/popular' },
  ];

  const SearchBar = ({ isMobile }: { isMobile?: boolean }) => (
    <div
      className={`flex items-center gap-2 ${
        isMobile ? 'lg:hidden' : 'hidden w-2/5 lg:flex xl:w-4/5'
      }`}
    >
      <input
        type='text'
        placeholder='Search for movies or Tv series..'
        className={`w-full rounded-xl border-0 border-b-2 px-4 py-2 text-sm text-black focus:border-primary focus:outline-none ${isMobile ? '' : 'bg-black-300/20 text-white placeholder:text-white-100 text-lg font-semibold backdrop-blur-md'}`}
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
            className='ml-auto flex items-center'
            onClick={() => setSearchBarShow((prev) => !prev)}
          >
            <Search size={24} className='text-white' />
          </button>
        </div>
      </nav>
      {searchBarShow && <SearchBar isMobile />}
    </header>
  );
};

export default NavBar;
