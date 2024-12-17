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
  const [isMobile, setIsMobile] = useState(false); 
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
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width > 1439) setPostersPerPage(5);
      else if (width > 1023) setPostersPerPage(4);
      else if (width > 767) setPostersPerPage(3);
      else if (width > 464) setPostersPerPage(3);
      else setPostersPerPage(1);

      const mobileCheck = width <= 464;
      setIsMobile(mobileCheck);

      console.log(`Width: ${width}, isMobile: ${mobileCheck}`);
    };

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    return () => {
      window.removeEventListener('resize', updateScreenSize);
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
      className='absolute left-2 top-[30%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80 md:top-1/2 md:flex lg:left-0'
      onClick={onClick}
    >
      <ArrowLeft size={20} />
    </button>
  );

  const CustomRightArrow = ({ onClick }: { onClick?: () => void }) => (
    <button
      className='absolute right-0 top-[30%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-primary p-2 text-white hover:bg-opacity-80 md:right-2 md:top-1/2 md:flex lg:right-0'
      onClick={onClick}
    >
      <ArrowRight size={20} />
    </button>
  );
  return (
    <section className='section_container relative overflow-hidden'>
      <MaxWidthWrapper className='xl:max-w-screen-xxl'>
        <div className='relative mx-auto flex h-full flex-col'>
          <div className='flex items-center justify-between xl:ml-10'>
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
          <div className='flex w-full items-center justify-start space-x-2 rounded-xl bg-black-200 py-6 text-white xl:ml-10'>
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
            // autoPlay={isMobile}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition='all .5s'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            transitionDuration={500}
            // infinite={isMobile}
          >
            {isTrendingLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='mx-auto flex w-[220px] items-end'>
                    <Skeleton className='h-[250px] w-full rounded-3xl' />
                  </div>
                ))
              : // eslint-disable-next-line @typescript-eslint/no-explicit-any
                trendingData.slice(0, 10).map((data: any, index: number) => (
                  <div
                    key={index}
                    className='group relative inset-0 z-10 mx-auto flex h-[250px] w-[180px] flex-none flex-col items-end'
                  >
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || ''}
                      className='w-[180px]'
                      imgClassName='h-[250px] w-[180px]'
                      filterType='Movie'
                      bgColor={false}
                      releaseYear={getYearFromDate(
                        data?.release_date || data?.first_air_date
                      )}
                      smallScreenBlur={isMobile}
                    />
                    <h3
                      className={`absolute bottom-0 -z-10 flex w-fit font-poppins-sans text-9xl font-bold md:bottom-0 ${
                        index === 9
                          ? '-left-[90px] md:-left-[70px] lg:group-hover:-left-[80px] xl:-left-[80px] xl:group-hover:-left-[100px]  xxl:-left-[70px] xxl:group-hover:-left-[100px]'
                          : index === 0
                            ? '-left-10 md:-left-7 lg:group-hover:-left-9 group-hover:left-0 xl:-left-7 xxl:-left-8  xxl:group-hover:-left-12'
                            : '-left-16 md:-left-9 lg:group-hover:-left-14  xl:-left-10 xl:group-hover:-left-16  xxl:-left-12 xxl:group-hover:-left-16'
                      } text-black transition-all duration-500 ease-in-out group-hover:text-secondary`}
                      style={{
                        WebkitTextStroke: '2px #9e5ff2',
                        WebkitTextStrokeWidth: '2px',
                        transition:
                          'left 0.5s ease-in-out, color 0.5s ease-in-out, -webkit-text-stroke 0.5s ease-in-out',
                      }}
                    >
                      {index + 1}
                    </h3>
                  </div>
                ))}
          </Carousel>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default TrendingSection;
