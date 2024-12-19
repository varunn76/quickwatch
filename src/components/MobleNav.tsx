'use client';

import React, { useState, useMemo } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Hamburger } from './icons';
import Link from 'next/link';
import { Search } from 'lucide-react';

const MobleNav = ({
  setSearchBarShow,
  searchBarShow,
}: {
  setSearchBarShow: React.Dispatch<React.SetStateAction<boolean>>;
  searchBarShow: boolean;
}) => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const NAVLINKS = useMemo(
    () => [
      { label: 'Home', href: '/home' },
      { label: 'Movies', href: '/movies' },
      { label: 'Tv-Series', href: '/tv-series' },
      { label: 'Most Popular', href: '/popular' },
    ],
    []
  );

  const handleNavMenu = () => setHamburgerOpen((prev) => !prev);

  const renderNavLinks = () =>
    NAVLINKS.map(({ label, href }) => (
      <Link
        key={href}
        href={href}
        className='rounded-lg border-secondary px-3 py-1 hover:border-b hover:border-r hover:bg-black-200/50'
      >
        <p className='text-base'>{label}</p>
      </Link>
    ));

  return (
    <nav className='relative z-10 lg:hidden'>
      <MaxWidthWrapper className='flex items-center'>
        <button
          onClick={handleNavMenu}
          aria-expanded={hamburgerOpen}
          aria-label='Toggle navigation menu'
          className='focus:outline-none'
        >
          <Hamburger
            size={24}
            className={hamburgerOpen ? 'text-secondary' : 'text-white'}
          />
        </button>
        <Link href='/' className='mx-2'>
          <img src='/logo.png' alt='logo' className='h-10 w-10' />
        </Link>
        {hamburgerOpen && (
          <div className='absolute left-0 top-12 flex h-56 w-full flex-col items-center justify-center gap-7 rounded-xl bg-black-200/90 px-5 font-poppins-sans text-white'>
            {renderNavLinks()}
          </div>
        )}
        <button
          className='ml-auto flex items-center'
          onClick={() => setSearchBarShow(!searchBarShow)}
        >
          <Search size={24} className='text-white' />
        </button>
      </MaxWidthWrapper>
    </nav>
  );
};

export default MobleNav;
