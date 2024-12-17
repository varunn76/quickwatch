/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Card from './Card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { getYearFromDate } from '@/utils';
import MaxWidthWrapper from './MaxWidthWrapper';

const ITEMS_PER_PAGE = 8;

const FilteredContent = ({
  filteredData = [],
  filterType,
}: {
  filteredData: any[];
  filterType: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  console.log('filteredData', filteredData);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  if (!Array.isArray(filteredData)) {
    console.error(
      "Invalid 'filteredData' prop passed to FilteredContent:",
      filteredData
    );
    return null;
  }

  const highestRatedMovieOrTvSeries = filteredData.reduce(
    (max, item) => (item.vote_average > (max.vote_average || 0) ? item : max),
    {}
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <MaxWidthWrapper>
      <section className='mx-auto mb-0 mt-10 flex flex-col rounded-3xl sm:bg-black-300 lg:mt-0'>
        <div className='flex-row xl:flex'>
          <div className='grid grid-cols-2 gap-8 sm:px-8 sm:py-8 md:grid-cols-3 lg:grid-cols-4 xl:w-[75%]'>
            {filteredData.length === 0
              ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <Skeleton key={index} className='sm:h-[270px] sm:w-[175px]' />
                ))
              : paginatedData.map((data, index) => (
                  <Card
                    key={index}
                    title={data?.title || 'Untitled'}
                    src={data?.poster_path || ''}
                    className='sm:h-[270px] sm:w-[175px]'
                    imgClassName='sm:h-[270px] sm:w-[175px]'
                    filterType={filterType}
                    releaseYear={getYearFromDate(data?.release_date)}
                  />
                ))}
          </div>
          <div className='hidden w-fit flex-col justify-start px-8 py-8 xl:flex'>
            <Suspense
              fallback={
                <Skeleton className='h-[400px] w-[270px] rounded-xl sm:h-[500px] sm:w-[340px] md:h-[600px] md:w-[400px]' />
              }
            >
              <Card
                title={''}
                src={highestRatedMovieOrTvSeries?.poster_path || ''}
                className='h-[400px] w-[270px] sm:h-[500px] sm:w-[340px] md:h-[600px] md:w-[400px]'
                imgClassName='h-[400px] w-[270px] sm:h-[500px] sm:w-[340px] md:h-[600px] md:w-[400px]'
                bgColor={false}
                blur={false}
              />
            </Suspense>
          </div>
        </div>
        <div className='flex w-full justify-center gap-4 py-4'>
          <button
            className='cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg disabled:opacity-50'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={30} />
          </button>
          <span className='text-white'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className='cursor-pointer rounded-full bg-primary from-primary to-accent/70 p-2 text-white hover:bg-gradient-to-tr hover:drop-shadow-lg disabled:opacity-50'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={30} />
          </button>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default FilteredContent;
