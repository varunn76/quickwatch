'use client';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Card from './Card';
import { getYearFromDate } from '@/utils';
import { Skeleton } from './ui/skeleton';
import Carousel from 'react-multi-carousel';

const MovieAndTvSection = () => {
  const [postersPerPage, setPostersPerPage] = useState(5);
  //   const [version, setVersion] = useState('tv');

  const { isLoading: isMovieLoading, data } = useQuery({
    queryKey: ['movie Data'],
    queryFn: async () => {
      const response = await fetch(
        `/api/trending?version=movie&trendingTime=week`
      );
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
  const latestMovieData = data?.data?.results || [];

  const { isLoading: isTvShowLoading, data: tvData } = useQuery({
    queryKey: ['tv Data'],
    queryFn: async () => {
      const response = await fetch(
        `/api/trending?version=tv&trendingTime=week`
      );
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
  const latestTvShow = tvData?.data?.results || [];

  const { isLoading: isAnimationLoading, data: animationData } = useQuery({
    queryKey: ['animation Data'],
    queryFn: async () => {
      const response = await fetch(`/api/discover?version=movie&genre=16`);
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
  const latestAnimateData = animationData?.data?.results || [];

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
      <MaxWidthWrapper className='space-y-12'>
        <div className='relative mx-auto flex h-full flex-col'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-white'>Latest Movies</h2>
            <Link href={`/movie`}>
              <span className='md:flex md:gap-2'>
                <p className='hidden text-base font-medium text-white-100/60 md:block'>
                  View All
                </p>
                <ArrowRight className='text-white-100/60' />
              </span>
            </Link>
          </div>

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition='transform 0.3s ease-in-out'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            transitionDuration={300}
            centerMode={false}
          >
            {isMovieLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : latestMovieData.map((data: any, index: number) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || '/poster_skeleton.png'}
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
        <div className='relative mx-auto flex h-full flex-col'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-white'>Latest Series</h2>
            <Link href={`/tv-series`}>
              <span className='md:flex md:gap-2'>
                <p className='hidden text-base font-medium text-white-100/60 md:block'>
                  View All
                </p>
                <ArrowRight className='text-white-100/60' />
              </span>
            </Link>
          </div>

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition='transform 0.3s ease-in-out'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            transitionDuration={300}
            centerMode={false}
          >
            {isTvShowLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : latestTvShow.map((data: any, index: number) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || '/poster_skeleton.png'}
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
        <div className='relative mx-auto flex h-full flex-col'>
          <div className='mb-4 flex items-center justify-between'>
            <h2 className='text-3xl font-bold text-white'>Animations</h2>
            <Link href={`/animation`}>
              <span className='md:flex md:gap-2'>
                <p className='hidden text-base font-medium text-white-100/60 md:block'>
                  View All
                </p>
                <ArrowRight className='text-white-100/60' />
              </span>
            </Link>
          </div>

          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition='transform 0.3s ease-in-out'
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            transitionDuration={300}
            centerMode={false}
          >
            {isAnimationLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : latestAnimateData.map((data: any, index: number) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || '/poster_skeleton.png'}
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

export default MovieAndTvSection;
