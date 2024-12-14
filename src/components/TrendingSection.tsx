'use client';

import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MaxWidthWrapper from './MaxWidthWrapper';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import { getYearFromDate } from '@/utils';
import { Skeleton } from './ui/skeleton';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const TrendingSection = () => {
  const [version, setVersion] = useState('all');
  const [postersPerPage, setPostersPerPage] = useState(5);

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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: postersPerPage,
      slidesToSlide: postersPerPage,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: postersPerPage,
      slidesToSlide: postersPerPage,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: postersPerPage,
      slidesToSlide: postersPerPage,
    },
  };

  useEffect(() => {
    const updatePostersPerPage = () => {
      const width = window.innerWidth;
      if (width > 1024) setPostersPerPage(5);
      else if (width > 768) setPostersPerPage(4);
      else if (width > 464) setPostersPerPage(3);
      else setPostersPerPage(1);
    };

    window.addEventListener('resize', updatePostersPerPage);
    updatePostersPerPage();

    return () => {
      window.removeEventListener('resize', updatePostersPerPage);
    };
  }, []);

  const versions = [
    { name: 'All', value: 'all' },
    { name: 'Movie', value: 'movie' },
    { name: 'Tv Series', value: 'tv' },
  ];
  const CustomLeftArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className='absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80 lg:left-0'
      onClick={onClick}
    >
      <ArrowLeft size={20} />
    </button>
  );

  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className='absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80 lg:right-0'
      onClick={onClick}
    >
      <ArrowRight size={20} />
    </button>
  );
  return (
    <section className='section_container relative overflow-hidden'>
      <MaxWidthWrapper>
        <div className='relative mx-auto flex h-full flex-col'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-white'>Trending</h2>
            <Link href={`/movie`}>
              <span className='md:flex md:gap-2'>
                <p className='hidden md:block text-base font-medium text-white-100/60'>View All</p>
                <ArrowRight className='text-white-100/60 ' />
              </span>
            </Link>
          </div>
          <div className='flex w-full items-center justify-start space-x-2 rounded-xl bg-black-200 py-6 text-white'>
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

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition='all .5s'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            transitionDuration={500}
          >
            {isTrendingLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='w-[220px] mx-auto flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                trendingData.map((data: any, index: number) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || ''}
                      className='w-full'
                      imgClassName='h-[320px] w-full'
                      filterType='Movie'
                      bgColor={false}
                      releaseYear={getYearFromDate(
                        data?.release_date || data?.first_air_date
                      )}
                    />
                  </div>
                ))}
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TrendingSection;
