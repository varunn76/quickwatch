'use client';

import { ArrowLeft, ArrowRight, PlayCircle } from 'lucide-react';
import React from 'react';
import ButtonWrapper from './ButtonWrapper';
import { getImageUrl } from '@/utils/imageUrlFormat';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Loader from '@/app/loading';
import Link from 'next/link';
import { stringToSlug } from '@/utils/stringToSlug';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { useSelector, useDispatch } from 'react-redux';
import slugify from 'slugify';
import {
  goToNextSlide,
  goToPrevSlide,
  setCurrentIndex,
} from '@/redux/slices/popularSlice';
import { RootState } from '@/redux/store/Store';

const fetchMovieBanner = async (id: number | undefined) => {
  if (!id) return [];
  try {
    const response = await fetch(`/api/movie?id=${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch popular data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return [];
  }
};

function PopularBanner({ currentIndex }: { currentIndex: number }) {
  const dispatch = useDispatch();
  const { popularData, loading } = useSelector(
    (state: RootState) => state.popular
  );

  const currentSlide = popularData[currentIndex];
  const title: string = currentSlide?.title;
  const {
    data: movieData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['popular', currentSlide?.id],
    queryFn: async () => {
      const data = await fetchMovieBanner(currentSlide?.id);
      return data;
    },
  });
  const handlePrevSlide = () => {
    dispatch(goToPrevSlide());
  };

  const handleNextSlide = () => {
    dispatch(goToNextSlide());
  };

  const handleGoToSlide = (slideIndex: number) => {
    dispatch(setCurrentIndex(slideIndex));
  };
  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center bg-black-300'>
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className='inset-0 h-full w-full backdrop-blur-sm lg:backdrop-blur-none'>
        <div className='absolute bottom-[35%] left-1/2 hidden -translate-x-1/2 items-center justify-center gap-6 md:bottom-[28%] md:flex lg:bottom-[88px] lg:left-1 lg:-translate-x-0 xl:left-24 2xl:bottom-[20%] 2xl:gap-10'>
          {Array.from({ length: 3 }).map((_, idx) => {
            const length = popularData?.length || 0;

            if (length === 0) {
              return null;
            }

            const index = (currentIndex + idx - 1 + length) % length;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={`popular-${index}`}
                className={`relative h-[200px] w-[130px] cursor-pointer rounded-xl bg-cover bg-center transition-transform md:h-[270px] md:w-[180px] lg:mb-10 lg:h-[320px] lg:w-[190px] xl:h-[250px] xl:w-[170px] 2xl:h-[450px] 2xl:w-[280px] ${
                  isCurrent ? 'z-10 scale-125 border' : 'scale-90 opacity-80'
                }`}
                style={{
                  backgroundImage: `url(${getImageUrl(
                    popularData[index]?.poster_path,
                    'w500'
                  )})`,
                }}
                onClick={() => dispatch(setCurrentIndex(index))}
              >
                {isCurrent && (
                  <Link
                    href={`/movie/${stringToSlug(popularData[index]?.title)}`}
                    className={`absolute inset-0 rounded-xl from-accent/40 opacity-0 transition-all hover:bg-gradient-to-t hover:opacity-80`}
                  >
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tl from-accent to-primary p-6'>
                      <PlayCircle className='absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-white' />
                    </div>
                  </Link>
                )}
                {isCurrent && (
                  <p className='sub-heading absolute -bottom-8 line-clamp-1 w-full text-center'>
                    {popularData[index]?.title}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {currentSlide?.poster_path && (
          <Link
            href={`/movie/${slugify(`${title}`, { lower: true, strict: true })}`}
            className='absolute left-1/2 top-[59%] w-full -translate-x-1/2 -translate-y-1/2 md:hidden'
          >
            <LazyLoadImage
              src={getImageUrl(currentSlide.poster_path, 'w500')}
              alt={currentSlide.title || 'Poster'}
              className='mx-auto h-[270px] w-[175px] rounded-lg border-2 object-cover shadow-2xl'
            />
          </Link>
        )}

        {/* Main Content */}
        {currentSlide && (
          <div className='absolute top-[8%] flex w-full flex-col justify-center px-6 text-white lg:top-[15%] lg:px-12'>
            <Link
              className=''
              href={`/movie/${slugify(`${title}`, { lower: true, strict: true })}`}
            >
              <h1 className='line-clamp-1 text-start text-4xl font-medium hover:text-secondary md:line-clamp-2 lg:text-5xl 2xl:text-6xl'>
                {title}
              </h1>
            </Link>
            <div className='mt-2 flex items-center gap-3'>
              <span className='rounded bg-[#ED8D0B] px-3 py-2 text-sm font-bold leading-3 text-black'>
                IMDB
              </span>
              <span className='gap-4 text-lg font-medium'>
                <span className='text-2xl'>
                  {currentSlide?.vote_average?.toFixed(1)}
                </span>{' '}
                / 10
              </span>
            </div>
            {!isLoading ? (
              <>
                <div className='sub-heading flex flex-wrap gap-3 py-3 !text-[0.8rem] lg:!text-[1rem] 2xl:!text-[1.5rem]'>
                  {movieData?.genres &&
                    movieData.genres.map((gener: string, index: number) => (
                      <span
                        key={index}
                        className='rounded-xl bg-primary/40 px-2 py-1.5'
                      >
                        {gener}
                      </span>
                    ))}
                </div>
                <div className='font-poppins-sans lg:w-4/5 xl:w-3/5 2xl:w-full 2xl:text-4xl'>
                  <p className='line-clamp-2 text-[0.8rem] lg:text-[1rem] 2xl:text-[1.3rem]'>
                    {movieData?.description}
                  </p>
                </div>
              </>
            ) : (
              <div className='flex flex-col space-y-4 py-3'>
                <div className='flex space-x-4'>
                  <Skeleton className='h-[40px] w-[100px] rounded-xl' />
                  <Skeleton className='h-[40px] w-[100px] rounded-xl' />
                </div>
                <div className='space-y-2'>
                  <Skeleton className='h-4 md:w-[700px]' />
                  <Skeleton className='h-4 md:w-[200px]' />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className='absolute bottom-[10px] left-1/2 w-full -translate-x-1/2 md:bottom-[18px] md:w-[90%] lg:left-[85%] lg:right-0 lg:w-fit lg:-translate-y-1/2 xl:left-[90%] 2xl:bottom-[200px]'>
          <div className='flex cursor-pointer justify-center'>
            <ButtonWrapper
              text='Watch Now'
              className='rounded-full from-primary to-accent/70 transition-all duration-300 hover:scale-125 hover:bg-gradient-to-tr hover:drop-shadow-lg 2xl:scale-125 2xl:hover:scale-150'
              route={`/watch/${slugify(`${title}`, { lower: true, strict: true })}`}
            />
          </div>
          <div className='mx-auto flex w-4/5 flex-col gap-5 md:mt-0 md:w-2/5 lg:mt-5 lg:w-fit'>
            <div className='flex w-full justify-between'>
              <div
                className='cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg'
                onClick={handlePrevSlide}
              >
                <ArrowLeft size={30} />
              </div>
              <div
                className='cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg'
                onClick={handleNextSlide}
              >
                <ArrowRight size={30} />
              </div>
            </div>

            {/* Pagination Dots */}
            <div className='bottom-4 flex w-full justify-center space-x-2'>
              {popularData.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => handleGoToSlide(slideIndex)}
                  className={`h-2 w-2 rounded-full border-[1.5px] ${
                    slideIndex === currentIndex
                      ? 'bg-primary'
                      : 'bg-white/50 hover:bg-primary'
                  }`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PopularBanner;
