import FilterSection from '@/components/FilterSection';
import HeroSection from '@/components/HeroSection';
import MovieAndTvSection from '@/components/MovieAndTvSection';
import ProviderSection from '@/components/ProviderSection';
import TrendingSection from '@/components/TrendingSection';
import React from 'react';

const Page = () => {
  return (
    <div className='h-screen w-full'>
      <HeroSection />
      <FilterSection />
      <TrendingSection />
      <MovieAndTvSection />
      <ProviderSection />
    </div>
  );
};

export default Page;
