/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/Store';

import { getImageUrl } from '@/utils/imageUrlFormat';
import Loader from '@/app/loading';
import PopularBanner from './PopularBanner';
import {
  setPopularData,
  setLoading,
  setError,
} from '@/redux/slices/popularSlice';
import { fetchPopular } from '@/utils';

const HeroSection = () => {
  const dispatch = useDispatch();
  const { popularData, currentIndex, loading } = useSelector(
    (state: RootState) => state.popular
  );

  const currentSlide = popularData[currentIndex];

  useEffect(() => {
    const getPopularData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchPopular();
        dispatch(setPopularData(data));
      } catch (err: any) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getPopularData();
  }, [dispatch]);

  if (loading || !currentSlide?.backdrop_path) {
    return (
      <div className='flex h-screen items-center justify-center bg-black-300'>
        <Loader />
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className='flex h-screen items-center justify-center text-red-500'>
  //       <p>Error: {error}</p>
  //     </div>
  //   );
  // }

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
