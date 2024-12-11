'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/Store';

import { getImageUrl } from '@/utils/imageUrlFormat';
import Loader from '@/app/loading';
import PopularBanner from './PopularBanner';

const HeroSection = () => {
  const { popularData, currentIndex, loading, error } = useSelector(
    (state: RootState) => state.popular
  );

  const currentSlide = popularData[currentIndex];

  if (loading || !currentSlide?.backdrop_path) {
    return (
      <div className='flex h-screen items-center justify-center bg-black-300'>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex h-screen items-center justify-center text-red-500'>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section>
      <div className='relative m-auto h-screen w-full max-w-full bg-gradient-to-t from-primary/25'>
        {currentSlide?.backdrop_path && (
          <div
            style={{
              backgroundImage: `url(${getImageUrl(
                currentSlide.backdrop_path,
                'original'
              )})`,
            }}
            className='absolute -z-10 h-full w-full bg-black/30 bg-cover bg-center'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70'></div>
          </div>
        )}

        <PopularBanner currentIndex={currentIndex} />
      </div>
    </section>
  );
};

export default HeroSection;
