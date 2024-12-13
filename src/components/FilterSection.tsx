'use client';

import React, { useEffect } from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import { MOVIE_GENRES, TV_GENRES } from '@/utils/geners';
import { Plus, Search } from 'lucide-react';
import FilteredContent from './FilteredContent';
import Loader from '@/app/loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store/Store';
import {
  setActiveFilter,
  setSelectedGenre,
  setSelectedYear,
  setSearchQuery,
  setData,
  setLoading,
  setShowModal,
} from '@/redux/slices/filterSlice';
import Link from 'next/link';

const FilterSection = () => {
  const dispatch = useDispatch();
  const {
    activeFilter,
    selectedGenre,
    selectedYear,
    searchQuery,
    data,
    loading,
    showModal,
  } = useSelector((state: RootState) => state.filter);

  const versions = ['Movie', 'Tv Series'];
  const genres = activeFilter === 'Movie' ? MOVIE_GENRES : TV_GENRES;

  const getLastTenYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 30 }, (_, index) => currentYear - index);
  };

  const fetchData = async (params: URLSearchParams = new URLSearchParams()) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch(`/api/discover?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const result = await response.json();

      dispatch(setData(result));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = async () => {
    const params = new URLSearchParams({
      version: activeFilter.toLowerCase(),
      genre: selectedGenre.toLowerCase(),
      year: selectedYear,
    });

    await fetchData(params);
  };

  // useEffect(() => {
  //   fetchData();
  // }, [dispatch]);

  const finaleData = data?.data?.results;
  console.log('Finished', finaleData);

  return (
    <section className='section_container relative'>
      <MaxWidthWrapper className='relative lg:-top-20'>
        <div className='w-full xl:max-w-screen-2xl'>
          <div className='h-full rounded-3xl bg-black-300'>
            <div className='grid h-full grid-cols-1 gap-4 px-4 py-8 md:grid-cols-2 xl:grid-cols-5 xl:gap-8'>
              <div className='flex h-full items-center justify-center space-x-2 rounded-xl bg-black-200 py-2 text-white'>
                {versions.map((version) => (
                  <p
                    key={version}
                    onClick={() => dispatch(setActiveFilter(version))}
                    className={`cursor-pointer rounded-md px-3 py-2 font-medium ${
                      activeFilter === version
                        ? 'bg-primary text-white'
                        : 'bg-transparent'
                    }`}
                  >
                    {version}
                  </p>
                ))}
              </div>

              <div className='flex h-full w-full cursor-pointer items-center justify-center space-x-2 rounded-xl bg-black-200 py-2 text-white hover:bg-primary lg:px-6'>
                <select
                  id='genre'
                  name='Genres'
                  className='w-full cursor-pointer bg-black-200 bg-transparent py-2 text-center text-white xl:px-2'
                  value={selectedGenre}
                  onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
                >
                  <option value='' disabled>
                    Select Genre
                  </option>
                  {genres.map((genre) => (
                    <option
                      key={genre.id}
                      value={genre.id}
                      className='bg-black-300 capitalize'
                    >
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex h-full w-full items-center justify-center'>
                <button
                  className='w-full rounded-xl bg-black-200 px-4 py-4 text-white hover:bg-primary'
                  onClick={() => dispatch(setShowModal(true))}
                >
                  {selectedYear}
                </button>
              </div>

              <Link
                href={`/top-imdb`}
                className='flex h-full w-full items-center justify-center space-x-2 rounded-xl bg-black-200 py-2 text-white hover:bg-primary lg:px-6'
              >
                <button className='flex items-center gap-2 p-2'>
                  More Filters
                  <Plus size={22} className='text-white' />
                </button>
              </Link>

              <div className='flex cursor-pointer justify-center md:col-span-2 md:items-center xl:col-span-1'>
                <button
                  onClick={handleSearch}
                  className='inline-flex gap-1 rounded-2xl bg-primary from-primary to-accent/70 px-10 py-4 text-white transition-all duration-300 hover:scale-125 hover:bg-gradient-to-tr hover:drop-shadow-lg 2xl:scale-125 2xl:hover:scale-150'
                >
                  Search <Search size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='w-full max-w-xl rounded-lg bg-black-200 p-6'>
              <h2 className='mb-4 text-center text-lg font-bold text-white'>
                Select Year
              </h2>
              <div className='grid max-h-80 grid-cols-3 gap-4 overflow-y-auto md:grid-cols-5 lg:grid-cols-7'>
                {getLastTenYears().map((year) => (
                  <button
                    key={year}
                    onClick={() => {
                      dispatch(setSelectedYear(year.toString()));
                      dispatch(setShowModal(false));
                    }}
                    className={`rounded-md bg-black-300 py-2 text-white hover:bg-primary ${
                      selectedYear === year.toString() ? 'bg-primary' : ''
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              <button
                className='mt-4 w-full rounded-md bg-primary py-2 text-white'
                onClick={() => dispatch(setShowModal(false))}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </MaxWidthWrapper>

      {/* {loading ? (
          <div className='flex h-screen items-center justify-center bg-black-300'>
            <Loader />
          </div>
        ) : (
          <FilteredContent filteredData={finaleData} />
        )} */}
      {finaleData && (
        <FilteredContent filteredData={finaleData} filterType={activeFilter} />
      )}
    </section>
  );
};

export default FilterSection;
