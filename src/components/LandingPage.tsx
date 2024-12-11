/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useRef } from 'react';
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

gsap.registerPlugin(ScrollTrigger);

const fetchPopular = async () => {
  const response = await fetch('/api/popular');
  if (!response.ok) {
    throw new Error(`Failed to fetch popular data: ${response.statusText}`);
  }
  const data = await response.json();
  return data.data.results.slice(0, 10);
};

const LandingPage = ({ query }: { query: string | undefined }) => {
  const dispatch = useDispatch();
  const { popularData, loading, error } = useSelector(
    (state: RootState) => state.popular
  );
  const containerRef = useRef<HTMLDivElement>(null);

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
  const POSTERDATA = [
    {
      className: 'top-[10px] left-[10px] lg:left-[120px] xl:left-[210px]',
    },
    {
      className:
        'top-[130px] right-[10px] md:top-[10px] lg:right-[120px] xl:right-[210px]',
    },
    {
      className:
        'top-[450px] left-[10px] md:top-[150px] md:left-[200px] lg:left-[300px] xl:left-[520px]',
    },
    {
      className:
        'top-[580px] md:top-[100px] right-[10px] md:right-[200px] lg:right-[300px] xl:right-[480px]',
    },
    {
      className:
        ' left-[50px] md:bottom-[30px] md:left-[250px] lg:left-[350px] xl:left-[340px]',
    },
    {
      className:
        'top-[800px] right-[20px] md:top-[400px] md:right-[150px] lg:right-[320px] xl:right-[300px]',
    },
    {
      className:
        'top-[950px] left-[20px] md:top-[400px] md:left-[180px] lg:left-[400px] xl:left-[710px]',
    },
  ];

  return (
    <>
      <section className='purple_container flex flex-col items-center lg:mt-16'>
        <img
          src='/logo.png'
          alt='Logo'
          className='h-[200px] md:h-[100px] md:w-[100px]'
        />
        <SearchForm query={query} />
        <span className='heading rounded-2xl'>
          Watch Movies, TV Series And Content On Demand,
          <span className='text-purple-300'>Anywhere, At Any Time</span>
          <h1>JustWatch.</h1>
        </span>
        <p className='sub-heading'>
          On any of your devices, find the ideal movie to watch.
        </p>
        <ButtonWrapper text='Watch All Movies & Series..' route='/home' />
      </section>

      <section
        className='new_container relative mx-auto h-screen w-full overflow-hidden'
        ref={containerRef}
      >
        {popularData.slice(0, 7).map(({ poster_path, title, id }, index) => {
          const { className } = POSTERDATA[index % POSTERDATA.length];
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
