'use client';

import React from 'react';
import MobleNav from './MobleNav';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header
      className={`font-work-sans absolute left-0 top-0 z-50 w-full px-5 py-3 shadow-none md:h-[3rem] lg:h-[4.5rem] lg:py-0 ${
        pathname === '/' ? 'bg-background' : 'bg-transparent'
      }`}
    >
      <MobleNav />
      <nav className='hidden items-center gap-5 px-10 py-4 lg:flex'>
        <Link href={`/`}>
          <img src='/logo.png' alt='logo' className='size-12' />
        </Link>
        <ul className='flex gap-x-10 2xl:text-[2rem]'>
          <li>
            <a
              href='/home'
              className='font-semibold text-white hover:text-primary-100'
            >
              Home
            </a>
          </li>
          <li>
            <a
              href='/movies'
              className='font-semibold text-white hover:text-primary-100'
            >
              Movies
            </a>
          </li>
          <li>
            <a
              href='/tv-series'
              className='font-semibold text-white hover:text-primary-100'
            >
              Tv-Series
            </a>
          </li>
          <li>
            <a
              href='/popular'
              className='font-semibold text-white hover:text-primary-100'
            >
              Most Popular
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
