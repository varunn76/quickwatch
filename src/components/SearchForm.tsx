import React from 'react';
import Form from 'next/form';

import { Search } from 'lucide-react';
import SearchFormReset from './SearchFormReset';

const SeachForm = ({ query }: { query: string | undefined }) => {
  return (
    <Form
      action={`/`}
      scroll={false}
      className='search-form xl:2/5 md:w-4/5 lg:w-3/5 xl:w-2/5'
    >
      <div className='flex items-center gap-2'>
        <div className='form-input mb-6'>
          <input
            name='query'
            defaultValue={query}
            className='search-input'
            placeholder='Search...'
          />

          {query && <SearchFormReset />}
        </div>
        <div className=''>
          <button type='submit' className='search-btn text-white'>
            <Search className='size-5' />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SeachForm;
