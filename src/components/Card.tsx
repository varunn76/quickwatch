/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Suspense } from 'react';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import slugify from 'slugify';
import { getImageUrl, ImageSize } from '@/utils/imageUrlFormat';
import { Skeleton } from './ui/skeleton';

interface CardProps {
  src: string;
  title: string;
  className?: string;
  imgClassName?: string;
  posterWidth?: ImageSize;
  bgColor?: boolean;
  releaseYear?: number | null;
  blur?: boolean;
  filterType?: string;
  smallScreenBlur?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  src,
  className = '',
  imgClassName = '',
  posterWidth = 'w500',
  filterType,
  releaseYear,
  blur = true,
  bgColor = true,
  smallScreenBlur = false,
}) => {
  return (
    <Link
      href={`/movie/${slugify(title, { lower: true, strict: true })}`}
      className={`lg:group relative flex w-full flex-col items-center overflow-hidden rounded-3xl ${className}`}
    >
      <Suspense
        fallback={
          <Skeleton className={`h-[320px] w-full rounded-xl ${className}`} />
        }
      >
        <LazyLoadImage
          src={getImageUrl(src, posterWidth)}
          alt={title || 'Poster'}
          placeholderSrc='/poster_skeleton.png'
          className={`rounded-3xl object-cover shadow-2xl transition-transform duration-300 ease-in-out group-hover:scale-105 ${imgClassName}`}
        />
      </Suspense>

      <div className='absolute inset-0 flex flex-col items-center justify-end rounded-3xl'>
        {bgColor && (
          <div className='absolute inset-0 rounded-xl bg-gradient-to-t from-primary via-black/30 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0'></div>
        )}
        <div
          className={`absolute bottom-2 flex h-[80px] w-[95%] ${smallScreenBlur && 'bg-primary/30 backdrop-blur-md'} flex-col items-start justify-between rounded-3xl pb-2 transition-all duration-300 ease-in-out ${
            blur ? 'lg:group-hover:backdrop-blur-md' : ''
          }`}
        >
          <div className='flex gap-2 px-1 py-2'>
            {filterType && (
              <p className='rounded-lg bg-secondary/60 px-2 text-sm font-medium text-white-100'>
                {filterType}
              </p>
            )}
            {releaseYear && (
              <p className='rounded-lg bg-secondary/60 px-2 text-sm font-medium text-white-100'>
                {releaseYear}
              </p>
            )}
          </div>
          <p className='line-clamp-1 px-2 text-center text-lg font-semibold text-white transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
