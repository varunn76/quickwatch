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
  const [trendingTime, setTrendingTime] = useState('day');
  const { isLoading: isTrendingLoading, data } = useQuery({
    queryKey: ['trending Data', version, trendingTime],
    queryFn: async () => {
      const response = await fetch(
        `/api/trending?version=${version}&trendingTime=${trendingTime}`
      );
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

  const trendingTimes = [
    { name: 'Today', value: 'day' },
    { name: 'Week', value: 'week' },
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
    <section className='section_container relative'>
      <MaxWidthWrapper className='xl:max-w-screen-xxl'>
        <div className='relative mx-auto flex h-full w-full flex-col'>
          <div className='flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-white'>Trending</h2>
            <Link href={`/movie`}>
              <span className='md:flex md:gap-2'>
                <p className='hidden text-base font-medium text-white-100/60 md:block'>
                  View All
                </p>
                <ArrowRight className='text-white-100/60' />
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
          <div className='relative mx-auto mb-4 flex w-fit gap-1 rounded-full border border-primary bg-black-300 p-1'>
            <div
              className='absolute left-0 top-0 h-full w-[50%] rounded-full bg-primary transition-all duration-300 ease-in-out'
              style={{
                transform: `translateX(${trendingTime === 'week' ? '100%' : '0'})`,
              }}
            ></div>
            {trendingTimes.map((item, index) => (
              <p
                key={index}
                onClick={() => setTrendingTime(item.value)}
                className={`relative z-10 cursor-pointer rounded-full px-5 py-1 font-medium ${
                  trendingTime === item.value ? 'text-white' : 'text-gray-400'
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
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                trendingData.slice(0, 10).map((data: any, index: number) => (
                  <div
                    key={index}
                    className='group relative inset-0 z-10 flex w-full flex-col'
                  >
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || ''}
                      className='mx-auto w-[180px] xl:ml-20'
                      imgClassName='h-[270px] w-[180px]'
                      filterType='Movie'
                      bgColor={false}
                      releaseYear={getYearFromDate(
                        data?.release_date || data?.first_air_date
                      )}
                    />
                    <h2
                      className={`absolute -bottom-1 -z-10 flex w-fit font-poppins-sans text-9xl font-bold md:bottom-0 ${index === 9 ? 'group-hover:-left-[50px] md:-left-6' : index === 0 ? 'group-hover:left-9 xl:left-12' : '-left-1 group-hover:-left-6 md:-left-1'} text-transparent transition-all duration-500 ease-in-out group-hover:text-secondary`}
                      style={{
                        WebkitTextStroke: '2px #9e5ff2',
                        transition:
                          'left 0.5s ease-in-out, color 0.5s ease-in-out, -webkit-text-stroke 0.5s ease-in-out',
                      }}
                    >
                      {index + 1}
                    </h2>
                  </div>
                ))}
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TrendingSection;
