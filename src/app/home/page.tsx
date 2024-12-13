import FilterSection from '@/components/FilterSection';
import HeroSection from '@/components/HeroSection';
import TrendingSection from '@/components/TrendingSection';
import React from 'react';

const Page = () => {
  return (
    <div className='h-screen w-full'>
      <HeroSection />
      <FilterSection />
      <TrendingSection />
    </div>
  );
};

export default Page;
