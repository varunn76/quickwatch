'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/utils/imageUrlFormat';

const Slide = () => {
  const [popularData, setPopularData] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/popular');
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        setPopularData(data.data.results || []);
        setLoading(false);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? popularData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === popularData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (loading || popularData.length === 0) return <div>Loading...</div>;

  const currentSlide = popularData[currentIndex];

  return (
    <div
      className='relative h-[600px] w-full bg-cover bg-center'
      style={{
        backgroundImage: `url(${getImageUrl(currentSlide?.backdrop_path, 'original')})`,
      }}
    >
      {/* Overlay for Gradient Effect */}
      <div className='absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70'></div>

      {/* Content Section */}
      <div className='relative z-10 flex h-full flex-col justify-center px-12 text-white'>
        <h1 className='text-4xl font-bold'>{currentSlide?.title}</h1>
        <div className='mt-2 flex items-center gap-2'>
          <span className='rounded bg-yellow-500 px-2 py-1 text-sm font-bold'>
            IMDB
          </span>
          <span className='text-lg font-medium'>
            {currentSlide?.vote_average}/10
          </span>
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className='absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4'>
        {popularData.map((slide, index) => (
          <div
            key={index}
            className={`h-[120px] w-[80px] cursor-pointer rounded-lg bg-cover bg-center ${
              currentIndex === index ? 'border-4 border-white' : 'opacity-50'
            }`}
            style={{
              backgroundImage: `url(${getImageUrl(slide.poster_path, 'w500')})`,
            }}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>

      <div
        className='absolute bottom-6 left-32 z-10 translate-y-[-50%] cursor-pointer rounded-full bg-primary p-2 text-white'
        onClick={prevSlide}
      >
        <ArrowLeft size={30} />
      </div>
      <div
        className='absolute bottom-6 right-32 z-10 translate-y-[-50%] cursor-pointer rounded-full bg-primary p-2 text-white'
        onClick={nextSlide}
      >
        <ArrowRight size={30} />
      </div>
    </div>
  );
};

export default Slide;
