/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { fetchPopular, POSTERDATA } from '@/utils';

gsap.registerPlugin(ScrollTrigger);

// Fetch popular movies

const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

interface posterType {
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
    Array<posterType>
  >([]);

  useEffect(() => {
    const updateItemsToShow = () => {
      setItemsToShow(window.innerWidth >= 1020 ? 7 : 4);
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
    setShuffledPosterData(shuffleArray(POSTERDATA));
  }, []);
  console.log('landing popular data', popularData);

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
        {popularData
          .slice(0, itemsToShow)
          .map(({ poster_path, title, id }, index) => {
            const { className } =
              shuffledPosterData[index % shuffledPosterData.length];
            return (
              <LandingPagePoster
                key={id}
                className={`poster absolute ${className}`}
                imgUrl={getImageUrl(poster_path, 'w500') || '/placeholder.jpg'}
                alt={title}
              />
            );
          })}
      </section>
    </>
  );
};

export default LandingPage;
