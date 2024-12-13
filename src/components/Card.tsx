/* eslint-disable @typescript-eslint/no-explicit-any */
import { getImageUrl, ImageSize } from '@/utils/imageUrlFormat';
import Link from 'next/link';
import React, { Suspense } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import slugify from 'slugify';
import { Skeleton } from './ui/skeleton';

const Card = ({
  title,
  src,
  className = '',
  imgClassName = '',
  posterWidth = 'w500',
  filterType,
  releaseYear,
  bgColor = true,
}: {
  src: string;
  title: string;
  className?: string;
  imgClassName?: string;
  posterWidth?: ImageSize;
  bgColor?: boolean;
  releaseYear?: number | null;
  filterType?: string;
}) => {
  return (
    <Link
      href={`/movie/${slugify(`${title}`, { lower: true, strict: true })}`}
      className={`group relative flex w-full flex-col items-center  overflow-hidden rounded-3xl ${className}`}
    >
      <Suspense fallback={<Skeleton className={className} />}>
        <LazyLoadImage
          src={getImageUrl(src, posterWidth)}
          alt={title || 'Poster'}
          placeholderSrc='/poster_skeleton.png'
          className={`rounded-xl object-cover shadow-2xl transition-transform duration-300 ease-in-out group-hover:scale-105 ${imgClassName}`}
        />
      </Suspense>

      <div className='absolute inset-0 flex flex-col items-center justify-end rounded-lg'>
        {/* Background Overlay */}
        {bgColor && (
          <div className='absolute inset-0 rounded-lg bg-gradient-to-t from-primary via-black/30 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-0'></div>
        )}

        {/* Content Section */}
        <div className='absolute bottom-2 flex h-[80px] w-[95%] flex-col items-start justify-between rounded-xl pb-2 transition-all duration-300 ease-in-out group-hover:backdrop-blur-md'>
          <span className='flex gap-2 px-1 py-2'>
            <p className='rounded-lg bg-accent/40 px-2 text-sm font-medium text-white-100'>
              {filterType}
            </p>
            <p className='rounded-lg bg-accent/40 px-2 text-sm font-medium text-white-100'>
              {releaseYear}
            </p>
          </span>
          <p className='line-clamp-1 px-2 text-center text-lg font-semibold text-white transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
            {title}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
