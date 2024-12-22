import React from 'react';
import { getYearFromDate } from '@/utils';
import { MovieData } from '@/utils/types';
import { Calendar, Star } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { getImageUrl } from '@/utils/imageUrlFormat';
import Link from 'next/link';
import slugify from 'slugify';

type SearchResultProps = {
  resultData: MovieData[];
};

const SearchResult = ({ resultData }: SearchResultProps) => (
  <section className='absolute h-dvh w-[34%] rounded-xl border bg-black-200/90 text-white-100 backdrop-blur-md xl:right-[405px]'>
    {resultData?.map((data) => (
      <Link
        href={`/movie/${slugify(`${data.title || data.original_title}`, { lower: true, strict: true })}`}
        className='mx-4 mt-4 flex gap-5 rounded-xl border-b-[0.1px] border-white/15 px-2 pb-1 pt-2 transition-all duration-300 hover:bg-primary/50'
        key={data.id}
      >
        <div className='h-full w-[45px] flex-shrink-0'>
          <LazyLoadImage
            src={getImageUrl(data.poster_path, 'w500')}
            alt={data.title || 'Poster'}
            placeholderSrc='/poster_skeleton.png'
            className='rounded-xl object-cover shadow-2xl'
          />
        </div>
        <div className='flex flex-1 flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between gap-2 text-lg font-semibold'>
              <span className='line-clamp-1'>{data.title || 'Untitled'}</span>
              <span className='flex gap-2'>
                <span className='flex items-center gap-1 text-sm text-yellow-400'>
                  <Star size={16} fill='currentColor' stroke='currentColor' />
                  {data.vote_average?.toFixed(1)}
                </span>{' '}
           
                <span className='flex items-center gap-1 text-sm text-white-100/60'>
                  <Calendar size={16} />
                  {getYearFromDate(data.release_date) || 'N/A'}
                </span>
              </span>
            </div>
            <p className='mt-1 line-clamp-1 text-sm text-white-100/80'>
              {data.overview || 'No description available.'}
            </p>
          </div>
        </div>
      </Link>
    ))}
  </section>
);

export default SearchResult;
