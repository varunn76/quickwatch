'use client';
import React, { useEffect, useState } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useQuery } from '@tanstack/react-query';
import { PROVIDERS } from '@/utils/providers';
import { getImageUrl } from '@/utils/imageUrlFormat';
import { Skeleton } from './ui/skeleton';
import Card from './Card';
import Carousel from 'react-multi-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getYearFromDate } from '@/utils';

const versions = [
  { name: 'Movie', value: 'movie' },
  { name: 'Series', value: 'tv' },
];

const DEFAULTS = {
  VERSION: 'movie',
  PROVIDER: 8,
  POSTERS_PER_PAGE: 5,
  ADULT: false,
};

// const fetchPopularData = async ({
//   version,
//   provider,
//   adult,
// }: {
//   version: string;
//   provider: number;
//   adult: boolean;
// }) => {
//   const response = await fetch(
//     `/api/discover?version=${version}&provider=${provider}&adult=${adult}`
//   );
//   return response.json();
// };

const ProviderSection = () => {
  const [version, setVersion] = useState(DEFAULTS.VERSION);
  const [provider, setProvider] = useState(DEFAULTS.PROVIDER);
  const [isMobile, setIsMobile] = useState(false);
  const [adult, setAdult] = useState(DEFAULTS.ADULT);
  const [postersPerPage, setPostersPerPage] = useState(5);

  const { isLoading, data } = useQuery({
    queryKey: ['provider Data', version, provider],
    queryFn: async () => {
      const response = await fetch(
        `/api/discover?version=${version}&provider=${provider}`
      );
      const data = await response.json();
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
  const popularDataResults = data?.data?.results || [];
  const selectedProvider = PROVIDERS.find(
    (item) => item.provider_id === provider
  );

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
      if (width > 1439) setPostersPerPage(7);
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
    <section className='section_container overflow-hidden'>
      <MaxWidthWrapper className='max-w-screen-2xl'>
        <div className='relative mx-auto flex h-full w-full max-w-screen-xl flex-col rounded-3xl bg-black-300 py-4 md:flex-row'>
          <div className='mx-6'>
            <h3
              className='text-center font-poppins-sans text-5xl font-bold uppercase leading-snug text-black transition-all duration-500 ease-in-out group-hover:text-secondary md:text-7xl lg:text-9xl'
              style={{
                WebkitTextStroke: '2px #9e5ff2',
                WebkitTextStrokeWidth: '2px',
                textShadow: '4px 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              Popular
            </h3>

            <div className='flex items-center justify-start gap-5'>
              {!selectedProvider ? (
                <>
                  <div className='mx-auto flex w-full items-end'>
                    <Skeleton className='h-full w-full rounded-3xl' />
                  </div>
                </>
              ) : (
                <LazyLoadImage
                  src={getImageUrl(selectedProvider.logo_path, 'original')}
                  alt={selectedProvider.provider_name || 'Poster'}
                  placeholderSrc='/poster_skeleton.png'
                  className='rounded-3xl object-cover shadow-2xl transition-transform duration-300 ease-in-out group-hover:scale-105'
                />
              )}
              <h4 className='font-poppins-sans text-5xl font-semibold leading-snug text-white transition-all duration-500 ease-in-out'>
                {version === 'tv' ? 'Series' : 'Movies'}
              </h4>
            </div>
          </div>
          <div className='mx-auto flex w-fit items-center justify-end py-4'>
            <div className='mx-auto flex h-fit w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-black-200 py-2 text-white hover:bg-primary lg:px-6'>
              <select
                id='genre'
                name='Genres'
                className='w-full cursor-pointer bg-transparent py-2 text-center text-white xl:px-2'
                value={provider}
                onChange={(e) => setProvider(Number(e.target.value))}
              >
                {PROVIDERS.map((item) => (
                  <option
                    key={item.provider_id}
                    value={item.provider_id}
                    className='bg-black-300 capitalize'
                  >
                    {item.provider_name}
                  </option>
                ))}
              </select>
            </div>
            <div className='flex h-fit w-full items-center justify-start space-x-2 rounded-xl bg-black-200 px-4 py-2 text-white xl:ml-10'>
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
          </div>
        </div>
        <div className='mx-auto my-10 max-w-screen-xxl'>
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
            {isLoading
              ? Array.from({ length: postersPerPage }).map((_, index) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Skeleton className='h-[320px] w-full rounded-3xl' />
                  </div>
                ))
              : popularDataResults.map((data: any, index: number) => (
                  <div key={index} className='mx-auto w-[220px] flex-none px-2'>
                    <Card
                      title={data?.title || data?.name || 'Untitled'}
                      src={data?.poster_path || '/poster_skeleton.png'}
                      className='w-full'
                      imgClassName='h-[280px] w-full'
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

export default ProviderSection;
