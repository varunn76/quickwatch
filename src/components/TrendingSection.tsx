'use client';

import React, { useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import { getYearFromDate } from '@/utils';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TrendingSection = () => {
  const [version, setVersion] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const postersPerPage = 5;

  const { isLoading: isTrendingLoading, data } = useQuery({
    queryKey: ['trending Data', version],
    queryFn: async () => {
      const response = await fetch(`/api/trending?version=${version}`);
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const trendingData = data?.data?.results || [];
  const totalPosters = trendingData.length;
  const totalPages = Math.ceil(trendingData.length / postersPerPage);

  const handleNext = () => {
    if (currentIndex + postersPerPage < totalPosters) {
      setCurrentIndex((prevIndex) => prevIndex + postersPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - postersPerPage >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - postersPerPage);
    }
  };

  const visiblePosters = trendingData.slice(
    currentIndex,
    currentIndex + postersPerPage
  );

  const versions = [
    { name: 'All', value: 'all' },
    { name: 'Movie', value: 'movie' },
    { name: 'Tv Series', value: 'tv' },
  ];

  return (
    <section className='section_container'>
      <MaxWidthWrapper>
        <div className='relative mx-auto flex h-[400px] flex-col'>
          <div>
            <h2 className='text-3xl font-bold text-white'>Trending</h2>
          </div>
          <div className='flex w-full items-center justify-start space-x-2 rounded-xl bg-black-200 py-2 text-white'>
            {versions.map((item, index) => (
              <p
                key={index}
                onClick={() => setVersion(item.value)}
                className={`cursor-pointer rounded-md px-3 py-2 font-medium ${
                  version === item.value
                    ? 'bg-primary text-white'
                    : 'bg-transparent'
                }`}
              >
                {item.name}
              </p>
            ))}
          </div>
          <div className='relative my-6 flex items-center overflow-hidden'>
            {currentIndex > 0 && (
              <button
                className='absolute z-10 cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg disabled:opacity-50'
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ArrowLeft size={30} />
              </button>
            )}
            <div
              className='flex h-full w-full justify-start gap-4 overflow-hidden pl-16 transition-transform duration-300'
              style={{
                transform: `translateX(-${Math.max(
                  0,
                  Math.min(
                    currentIndex * (40 + 16),
                    (totalPosters - postersPerPage) * (40 + 16)
                  )
                )}px)`,
              }}
            >
              {visiblePosters.map((data: any, index: number) => (
                <Card
                  key={index}
                  title={data?.title || data?.name || 'Untitled'}
                  src={data?.poster_path || ''}
                  className='w-[210px] flex-none'
                  imgClassName='h-[320px] w-[210px]'
                  filterType='Movie'
                  bgColor={false}
                  releaseYear={getYearFromDate(
                    data?.release_date || data?.first_air_date
                  )}
                />
              ))}
            </div>
            {currentIndex + postersPerPage < totalPosters && (
              <button
                className='absolute right-0 z-10 cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg disabled:opacity-50'
                onClick={handleNext}
                disabled={currentIndex === totalPages - 1}
              >
                <ArrowRight size={30} />
              </button>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TrendingSection;
