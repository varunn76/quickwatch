'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Hamburger } from './icons';
import Link from 'next/link';

const MobleNav = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const NAVLINKS = [
    {
      label: 'Home',
      href: '/home',
    },
    {
      label: 'Movies',
      href: '/movies',
    },
    {
      label: 'Tv-Series',
      href: '/tv-series',
    },
    {
      label: 'Most Popular',
      href: '/popular',
    },
  ];
  const handleNavMenu = () => {
    setHamburgerOpen(!hamburgerOpen);
  };
  return (
    <nav className='relative z-10 lg:hidden'>
      <MaxWidthWrapper className='flex'>
        <button onClick={handleNavMenu}>
          <Hamburger
            size={24}
            className={hamburgerOpen ? 'text-secondary' : 'text-white'}
          />
        </button>
        <Link href={`/`} className='mx-2'>
          <img src='/logo.png' alt='logo' className='size-10' />
        </Link>
        {hamburgerOpen && (
          <div className='absolute left-0 top-12 flex h-56 w-full flex-col items-center justify-center gap-7 rounded-xl bg-black-200/90 px-5 font-poppins-sans text-white'>
            {NAVLINKS.map(({ label, href }, index) => (
              <Link
                key={index}
                href={href}
                className='rounded-lg border-secondary px-3 py-0.5 hover:border-b hover:border-r hover:bg-black-200/50'
              >
                <p className='text-base'>{label}</p>
              </Link>
            ))}
          </div>
        )}
      </MaxWidthWrapper>
    </nav>
  );
};

export default MobleNav;
