'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/Store';
import LandingPagePoster from './LandingPagePoster';
import SearchForm from './SearchForm';
import ButtonWrapper from './ButtonWrapper';
import { getImageUrl } from '@/utils/imageUrlFormat';
import {
  setPopularData,
  setLoading,
  setError,
} from '@/redux/slices/popularSlice';
import { fetchPopular } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

export const POSTERDATA = [
  { className: 'top-[0px] left-[10px] lg:left-[120px] xl:left-[210px]' },
  {
    className:
      'top-[50px] right-[10px] md:top-[0px] lg:right-[120px] xl:right-[210px]',
  },
  {
    className:
      'top-[320px] left-[10px] md:top-[150px] md:left-[200px] lg:left-[300px] xl:top-[120px] xl:left-[520px]',
  },
  {
    className:
      'top-[380px] md:top-[150px] right-[10px] md:right-[200px] lg:right-[300px] xl:right-[480px]',
  },
  {
    className:
      'md:top-[450px] hidden lg:block lg:left-[100px] xl:top-[350px] xl:left-[340px]',
  },
  {
    className:
      'md:top-[450px] hidden lg:block lg:right-[100px] xl:top-[350px] xl:right-[300px]',
  },
  {
    className:
      'md:top-[520px] hidden lg:block lg:left-[430px] xl:top-[350px] xl:left-[710px]',
  },
];

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface PosterType {
  poster_path: string | null;
  title: string;
  id: number;
  className: string;
}

const LandingPage = ({ query }: { query: string | undefined }) => {
  const dispatch = useDispatch();
  const { popularData } = useSelector((state: RootState) => state.popular);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [shuffledPosterData, setShuffledPosterData] = useState<
    Array<PosterType>
  >([]);

  useEffect(() => {
    const updateItemsToShow = () => {
      setItemsToShow(window.innerWidth >= 768 ? 7 : 4);
    };

    updateItemsToShow(); // Initial call
    window.addEventListener('resize', updateItemsToShow);

    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      gsap.fromTo(
        container.querySelectorAll('.poster'),
        { y: '100vh', opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.3,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
          },
        }
      );
    }
  }, [popularData]);

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

  useEffect(() => {
    // Shuffle poster data only if POSTERDATA is available
    if (POSTERDATA.length > 0) {
      setShuffledPosterData(shuffleArray(POSTERDATA));
    }
  }, []);

  return (
    <>
      <section className='purple_container flex max-h-max flex-col items-center lg:mt-16'>
        <img
          src='/logo.png'
          alt='Logo'
          className='h-[200px] md:h-[100px] md:w-[100px]'
        />
        <SearchForm query={query} />
        <span className='heading rounded-2xl'>
          Watch Movies, TV Series And Content On Demand,{' '}
          <span className='text-purple-300'>Anywhere, At Any Time</span>
          <h1>JustWatch.</h1>
        </span>
        <p className='sub-heading'>
          On any of your devices, find the ideal movie to watch.
        </p>
        <ButtonWrapper text='Watch All Movies & Series..' route='/home' />
      </section>

      <section
        className='new_container w-ful relative mx-auto min-h-screen overflow-y-hidden'
        ref={containerRef}
      >
        {popularData.length > 0 && shuffledPosterData.length > 0
          ? popularData
              .slice(0, itemsToShow)
              .map(({ poster_path, title, id }, index) => {
                const { className } =
                  shuffledPosterData[index % shuffledPosterData.length];
                return (
                  <LandingPagePoster
                    key={id}
                    className={`poster absolute ${className}`}
                    imgUrl={
                      getImageUrl(poster_path, 'w500') || '/placeholder.jpg'
                    }
                    alt={title}
                  />
                );
              })
          : null}
      </section>
    </>
  );
};

export default LandingPage;
