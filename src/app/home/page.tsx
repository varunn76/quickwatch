import FilterSection from '@/components/FilterSection';
import HeroSection from '@/components/HeroSection';
import React from 'react';

const Page = () => {
  return (
    <div className='h-screen w-full'>
      <HeroSection />
      <FilterSection />
    </div>
  );
};

export default Page;
