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
  bgColor = true,
}: {
  src: string;
  title: string;
  className?: string;
  imgClassName?: string;
  posterWidth?: ImageSize;
  bgColor?: boolean;
}) => {
  return (
    <Link
      href={`/movie/${slugify(`${title}`, { lower: true, strict: true })}`}
      className={`group relative flex w-full flex-col items-center overflow-hidden rounded-lg ${className}`}
    >
      <Suspense fallback={<Skeleton className={className} />}>
        <LazyLoadImage
          src={getImageUrl(src, posterWidth)}
          alt={title || 'Poster'}
          placeholderSrc='/poster_skeleton.png'
          className={`rounded-lg object-cover shadow-2xl transition-transform duration-300 ease-in-out group-hover:scale-105 ${imgClassName}`}
        />
      </Suspense>

      {bgColor && (
        <div className='to-transparentopacity-100 absolute inset-0 rounded-lg bg-gradient-to-t from-primary via-black/30 transition-opacity duration-300 ease-in-out'></div>
      )}
      <p className='absolute bottom-2 left-2 right-2 z-10 line-clamp-1 text-center text-sm font-semibold text-white transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        {title}
      </p>
    </Link>
  );
};

export default Card;
