import FilterSection from '@/components/FilterSection';
import HeroSection from '@/components/HeroSection';
import MovieAndTvSection from '@/components/MovieAndTvSection';
import TrendingSection from '@/components/TrendingSection';
import React from 'react';

const Page = () => {
  return (
    <div className='h-screen w-full'>
      <HeroSection />
      <FilterSection />
      <TrendingSection />
      <MovieAndTvSection />
    </div>
  );
};

export default Page;
